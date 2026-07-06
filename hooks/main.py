"""
Macros plugin module for farminggames.help
Provides template helpers for batch page generation.
"""

import re

def define_env(env):
    """Define template variables and functions for MkDocs macros plugin."""

    # ── Tier Ranking Helpers ──

    @env.macro
    def tier_badge(tier):
        """Render a tier ranking badge (S/A/B/C/D/F)."""
        colors = {
            "S": "#FF4444", "A": "#FF8C00", "B": "#FFD700",
            "C": "#44AA44", "D": "#4488FF", "F": "#888888"
        }
        color = colors.get(tier.upper(), "#888")
        return f'<span style="display:inline-block;padding:2px 8px;border-radius:4px;background:{color};color:#fff;font-weight:bold;font-size:0.85em">{tier.upper()}</span>'

    @env.macro
    def stat_bar(value, max_val=100, color="#4CAF50"):
        """Render a horizontal stat bar."""
        pct = min(100, int(value / max_val * 100))
        return (
            f'<div style="background:#333;border-radius:4px;overflow:hidden;height:20px;min-width:120px">'
            f'<div style="width:{pct}%;background:{color};height:100%;display:flex;align-items:center;padding-left:6px;font-size:0.75em;color:#fff;font-weight:bold">{value}</div>'
            f'</div>'
        )

    @env.macro
    def star_rating(rating):
        """Render star rating (0-5)."""
        full = "★" * int(rating)
        half = "½" if rating - int(rating) >= 0.5 else ""
        empty = "☆" * max(0, 5 - int(rating) - (1 if half else 0))
        return f'<span style="color:#FFD700;font-size:1.1em">{full}{half}{empty}</span>'

    @env.macro
    def profit_table(items, title="Profit Comparison"):
        """Generate a styled profit comparison table from a list of dicts.
        Each item should have: name, seed_cost, grow_days, regrow, sell_price, profit_per_day, notes
        """
        if not items:
            return "<p>No data available</p>"

        rows = ""
        best = max(float(i.get("profit_per_day", 0)) for i in items)

        for item in sorted(items, key=lambda x: float(x.get("profit_per_day", 0)), reverse=True):
            p = float(item.get("profit_per_day", 0))
            bar_pct = min(100, int(p / best * 100)) if best > 0 else 0
            is_best = p >= best and best > 0
            row_class = 'style="background:rgba(76,175,80,0.15)"' if is_best else ""

            rows += f"""<tr {row_class}>
                <td><strong>{item.get("name", "")}</strong></td>
                <td>{item.get("seed_cost", "-")}g</td>
                <td>{item.get("grow_days", "-")}d</td>
                <td>{item.get("regrow", "No")}</td>
                <td>{item.get("sell_price", "-")}g</td>
                <td><div style="display:flex;align-items:center;gap:6px"><div style="background:#333;border-radius:3px;overflow:hidden;height:16px;width:80px"><div style="width:{bar_pct}%;background:{'#FFD700' if is_best else '#4CAF50'};height:100%"></div></div><strong>{p}g</strong></div></td>
                <td>{item.get("notes", "")}</td>
            </tr>"""

        return f"""<table class="datatable" style="width:100%">
            <thead><tr>
                <th>Crop</th><th>Seed Cost</th><th>Grow Days</th><th>Regrow</th><th>Sell Price</th><th>Profit/Day</th><th>Notes</th>
            </tr></thead>
            <tbody>{rows}</tbody>
        </table>"""

    @env.macro
    def affiliate_button(store, game, url, price=""):
        """Generate an affiliate purchase button."""
        store_icons = {
            "steam": "🎮 Steam",
            "humble": "📦 Humble Bundle",
            "amazon": "📦 Amazon",
            "gog": "🟡 GOG",
            "epic": "⭐ Epic Games"
        }
        label = store_icons.get(store.lower(), store)
        price_text = f" - {price}" if price else ""
        return (
            f'<a href="{url}" target="_blank" rel="nofollow sponsored" '
            f'style="display:inline-block;padding:8px 16px;margin:4px;background:#2e7d32;color:#fff;'
            f'border-radius:8px;text-decoration:none;font-size:0.9em">'
            f'{label}{price_text} 🛒</a>'
        )

    @env.macro
    def tier_table(items, title="Tier Ranking"):
        """Generate a tier ranking table from a list of dicts.
        Each item: name, tier, description, icon
        """
        if not items:
            return "<p>No data available</p>"

        tier_order = {"S": 0, "A": 1, "B": 2, "C": 3, "D": 4, "F": 5}
        rows = ""
        for item in sorted(items, key=lambda x: tier_order.get(x.get("tier", "F").upper(), 9)):
            t = item.get("tier", "?").upper()
            rows += f"""<tr>
                <td>{tier_badge(t)}</td>
                <td><strong>{item.get("icon", "")} {item.get("name", "")}</strong></td>
                <td>{item.get("description", "")}</td>
            </tr>"""

        return f"""<table class="datatable" style="width:100%">
            <thead><tr><th>Tier</th><th>Name</th><th>Description</th></tr></thead>
            <tbody>{rows}</tbody>
        </table>"""

    @env.macro
    def affiliate_section(game_name, steam_id="", humble_url=""):
        """Standard affiliate section for bottom of guides."""
        html = '\n---\n\n### 🛒 Where to Buy\n\n'
        if steam_id:
            html += affiliate_button("steam", game_name, f"https://store.steampowered.com/app/{steam_id}/") + "\n"
        if humble_url:
            html += affiliate_button("humble", game_name, humble_url) + "\n"
        html += '\n\n*Disclosure: Affiliate links. We may earn a small commission at no extra cost to you.*\n'
        return html

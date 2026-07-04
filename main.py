"""
MkDocs Macros Plugin - 为mkdocs模板提供自定义函数
"""
import re
from datetime import datetime

def define_env(env):
    """定义模板变量和函数"""

    @env.macro
    def game_card(title, description, url, icon=""):
        """生成游戏卡片HTML"""
        return f'''
<div class="game-card" onclick="window.location.href='{url}'">
    <div class="game-card-icon">{icon}</div>
    <div class="game-card-content">
        <h3>{title}</h3>
        <p>{description}</p>
    </div>
    <div class="game-card-arrow">→</div>
</div>'''

    @env.macro
    def tier_rank(name, tier, desc=""):
        """生成Tier排行标签"""
        colors = {'S': '#ff7f50', 'A': '#4caf50', 'B': '#2196f3', 'C': '#9e9e9e', 'D': '#f44336'}
        color = colors.get(tier.upper(), '#9e9e9e')
        return f'<span class="tier-badge" style="background:{color}">{tier}</span> {name}'

    @env.macro
    def datatable_start():
        """标记数据表开始（纯标记，DataTables JS会自动检测）"""
        return ''

    @env.macro
    def profit_calc(seed_cost, grow_days, harvest_price, regrow=False):
        """计算作物利润/天"""
        if regrow:
            # 对于可再生的，假设收获3次
            total = harvest_price * 3 - seed_cost
            return round(total / (grow_days + 7 * 2), 1)
        else:
            profit = harvest_price - seed_cost
            return round(profit / grow_days, 1)

    @env.macro
    def current_year():
        """返回当前年份"""
        return str(datetime.now().year)

    @env.macro
    def rating_stars(score):
        """生成评分星级HTML"""
        full = int(score)
        half = 1 if score - full >= 0.5 else 0
        empty = 5 - full - half
        stars = '★' * full + '½' * half + '☆' * empty
        return f'<span class="rating">{stars}</span>'

import discord
from discord.ext import commands


class ExampleCog(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @commands.command()
    async def ping(self, ctx):
        """Shows the current ping"""
        embed = discord.Embed(title="Pong!", description="Got a reply in {0}".format(round(self.bot.latency, 1)), color=0x4287f5)
        await ctx.send(embed=embed)

def setup(bot):
    bot.add_cog(ExampleCog(bot))

from logging import exception
import warnings
import discord
import traceback
from discord.ext import commands


class CommandErrorHandler(commands.Cog):

    def __init__(self, bot):
        self.bot = bot
        
    @commands.Cog.listener()
    async def on_application_command_error(self, ctx, error):
        warnings.warn(error)
        if isinstance(error, commands.CommandNotFound):
            embed = discord.Embed(title="Command not found", description=f"```{error}```")
            await ctx.respond(embed=embed)

        elif isinstance(error, commands.MissingPermissions):
            embed = discord.Embed(title="You don't have permission to do that!", description=f"```{error}```")
            await ctx.respond(embed=embed)
            
        elif isinstance(error, commands.MissingRole):
            embed = discord.Embed(title="You don't have permission to do that!", description=f"```{error}```")
            await ctx.respond(embed=embed)
        
        elif isinstance(error, commands.BotMissingPermissions):
            embed = discord.Embed(title="I don't have permission to do that!", description=f"```{error}```")
            await ctx.respond(embed=embed)

        elif isinstance(error, commands.MissingRequiredArgument):
            embed = discord.Embed(title="You are missing a required argument!", description=f"```{error}```")
            await ctx.respond(embed=embed)

        elif isinstance(error, commands.BadArgument):
            embed = discord.Embed(title="Invalid argument!", description=f"```{error}```")
            await ctx.respond(embed=embed)

        elif isinstance(error, commands.CommandError) or isinstance(error,commands.CommandInvokeError):
            try:
                embed = discord.Embed(title="An error has occured!", description=f"```{error}```")
                await ctx.respond(embed=embed)
            except:
                await ctx.respond("An error has occured!")
        else: 
            try:
                embed = discord.Embed(title="An error has occured!", description=f"```{error}```")
                await ctx.respond(embed=embed)
            except:
                await ctx.send(f'Ignoring exception in command: {ctx.command}.\nError is of type {type(error).__name__}, with args of {error.args}')
            traceback.print_exception(type(error), error, error.__traceback__)
    
    @commands.Cog.listener()
    async def on_command_error(self, ctx, error):
        warnings.warn(error)
        if isinstance(error, commands.CommandNotFound):
            embed = discord.Embed(title="Command not found", description=f"```{error}```")
            await ctx.send(embed=embed)

        elif isinstance(error, commands.MissingPermissions):
            embed = discord.Embed(title="You don't have permission to do that!", description=f"```{error}```")
            await ctx.send(embed=embed)

        elif isinstance(error, commands.MissingRequiredArgument):
            embed = discord.Embed(title="You are missing a required argument!", description=f"```{error}```")
            await ctx.send(embed=embed)

        elif isinstance(error, commands.BadArgument):
            embed = discord.Embed(title="Invalid argument!", description=f"```{error}```")
            await ctx.send(embed=embed)

        elif isinstance(error, commands.CommandError) or isinstance(error,commands.CommandInvokeError):
            await ctx.message.add_reaction('❌')
            try:
                embed = discord.Embed(title="An error has occured!", description=f"```{error}```")
                await ctx.send(embed=embed)
            except:
                await ctx.send("An error has occured!")
        else: 
            await ctx.send(f'Ignoring exception in command: {ctx.command}.\nError is of type {type(error).__name__}, with args of {error.args}')
            traceback.print_exception(type(error), error, error.__traceback__)


def setup(bot):
    bot.add_cog(CommandErrorHandler(bot))
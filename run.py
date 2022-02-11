import discord
from discord.ext import commands
from os import path, listdir
import yaml
from dotenv import load_dotenv; load_dotenv() #We need this for .env to work. This needs to be spesified in each file that wants to access a .env file, otherwise it may not work.

configFile = "./config/local.yaml" #This is just temporary, we can get rid of this later and replace it with env or something

if not path.isfile(configFile):
    raise Exception(f"'{configFile}' not found!")
with open(configFile, "r") as stream:
    try:
        config = yaml.safe_load(stream)
    except yaml.YAMLError as exception:
        raise exception

client = commands.Bot(command_prefix=commands.when_mentioned_or(config["prefix"]), intents=discord.Intents.all(), activity=discord.Game(name=f"{config['token']}help"), case_insensitive=True)

for filename in listdir('./src'):
    if not filename.endswith('.py'): continue
    try:
        client.load_extension(f'src.{filename[:-3]}')
        print(f"loaded src.{filename[:-3]}")
    except:
        print(f'Unable to load src.{filename[:-3]}')

@client.event
async def on_ready():
    print(f'\n\nLogged in as: {client.user.name} - {client.user.id}\nVersion: {discord.__version__}, Prefix: {config["prefix"]}\n')
    
client.run(config["token"])
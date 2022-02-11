<!-- shields -->
[![](https://img.shields.io/github/issues/crowdincraft/crowdinbot)](https://github.com/crowdincraft/crowdinbot/issues)
[![](https://img.shields.io/github/stars/crowdincraft/crowdinbot)](https://github.com/crowdincraft/crowdinbot/stargazers)
[![](https://img.shields.io/github/license/crowdincraft/crowdinbot)](https://github.com/crowdincraft/crowdinbot/blob/master/LICENSE.md)

# Crowdin Bot

<!-- PROJECT LOGO -->
<br/>
<p align="center">
  <a href="https://crowdin.com/">
    <img src="crowdin-logo.png" alt="Crowdin" width="80" height="80">
  </a>

<h3 align="center">CrowdinBot</h3>

  <p align="center">
    A Discord bot for <fill me>
    <br/>
    <a href="link">Translate MC</a>
    ·
    <a href="https://github.com/crowdincraft/crowdinbot/issues">Request Feature</a>
  </p>
</p>

## About the project
Description here

## Usage
If you want to tinker around with the project on your local PC or run your own instance of the bot, you can simply go ahead!

Here's a guide on how you can do that.

### Prerequisites
You need to have installed Git, node.js, and yarn.

In order to use a Discord bot, you need to create one on the Discord developer portal.

### Cloning the repository
You can download this repository with the following command:

```
git clone https://github.com/crowdincraft/crowdinbot.git
```

### Installation
In order to install the dependencies, simply use this command:

```
yarn install
```

### Configuration
There are multiple configuration files that are used to configure the bot. They are all located in the directory `config`.

In order to run the bot, you need to set up a `local.yml` file for the bot's credentials. In order to do so, follow the steps outlined in the `local.template.yml` file.

There are multiple deployment configurations for different instances of the bot. Currently the following configurations are available:
- `main` – Main CrowdinBot on the Minecraft Translators Discord server

You can create another configuration like that for your own bot.

An overview / documentation of all config options can be found in `template.yml`.

### Running
#### Testing / development
For testing or development purposes, it is recommended to run the bot using the following command:

```
NODE_ENV=<deployment> yarn run bot
```

where `<deployment>` is the name of a deployment configuration (`main` or `beta`).

#### Deployment
To deploy the bot, you need to run the following command:

```
./start.sh <deployment>
```

where `<deployment>` is the name of a deployment configuration (`main` or `beta`).

Note that the bot is started in a detached screen, which means you won't see any output and the bot is running in the background.

You can stop the bot with `./stop.sh <deployment>` or restart it with `./restart.sh <deployment>`.

### Minimal bot permissions
For the bot to function properly, the minimal Discord permissions bitfield is `2415945808`.

## Built with

This project depends on the following projects, thanks to every developer who makes their code open-source! :heart:

- [discord.js](https://github.com/discordjs/discord.js/)
- [ESLint](https://github.com/eslint/eslint)
- [JS-YAML](https://github.com/nodeca/js-yaml)
- [log4js](https://github.com/log4js-node/log4js-node)
- [node-config](https://github.com/lorenwest/node-config)
- [TypeScript](https://github.com/Microsoft/TypeScript/)
- [TypeScript ESLint](https://github.com/typescript-eslint/typescript-eslint/)

...and of course all the typings from [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped/)!

## Contributing

You're very welcome to contribute to this project! Please note that this project uses [TypeScript ESLint](https://github.com/typescript-eslint/typescript-eslint/) to ensure consistent code, you can execute `npm run lint` to fix lint warnings and errors automatically.

## License

Distributed under the GNU General Public License v3.0. See `LICENSE.md` for more information.

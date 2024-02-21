# TCC

Repository for final paper in Computer Science major

## Before running the application

### First you need to install the required packages running the following command:

```bash
npm install
```

### Creating the ssl keys by running the following command:

```bash
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365
```

Just follow the instructions and a key.pem and cert.pem file must have been created

### Creating database file by running this command:

Require install sqlite3

```bash
sudo apt install sqlite3
```

```bash
sqlite3 database.db < init.sql
```

## How to start the application

```bash
npm run start
```

Disclaimer: maybe your browser will block the application because ssl certificate

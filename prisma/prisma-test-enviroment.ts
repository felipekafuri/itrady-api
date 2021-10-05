import NodeEnvironment from 'jest-environment-node';
import type { Config } from '@jest/types';
import { exec } from 'child_process';
import { v4 as uuid } from 'uuid';
import dotenv from 'dotenv';
import { Client } from 'pg';
import util from 'util';

dotenv.config({ path: '.env.testing' });

const execSync = util.promisify(exec);

const prismaBinary = './node_modules/.bin/prisma';

export default class PrismaTestEnvironment extends NodeEnvironment {
  private schema: string;
  private connectionString: string;

  constructor(config: Config.ProjectConfig) {
    super(config);

    this.schema = `test_${uuid()}`;
    this.connectionString = `${process.env.TESTS_DATABASE_URL}?schema=${this.schema}`;
  }

  async setup() {
    process.env.TESTS_DATABASE_URL = this.connectionString;
    this.global.process.env.TESTS_DATABASE_URL = this.connectionString;

    await execSync(`${prismaBinary} migrate deploy --preview-feature`);

    return super.setup();
  }

  async teardown() {
    const client = new Client({
      connectionString: this.connectionString,
    });

    await client.connect();
    await client.query(`DROP SCHEMA IF EXISTS "${this.schema}" CASCADE`);
    await client.end();
  }
}
import * as glob from 'glob';
const lcovSourcemap = require('lcov-sourcemap');

function mapCoverage(options: mapCoverage.IOptions = {}): void {
  const cwd = options.cwd || process.cwd();
  const input = (options.input || 'coverage/lcov.info');
  const output = (options.output || 'coverage/lcov-mapped.info');
  const ignore = options.exclude || 'node_modules/**';
  const fileExtension = options.fileExtension || '.js.map';

  const pattern = '**/*' + fileExtension;

  const maps = glob.sync(pattern, {cwd, ignore})
  .reduce((maps, file) => {
    const base = file.substr(0, file.length - fileExtension.length);
    maps[base] = file;
    return maps;
  }, {});

  lcovSourcemap.writeLcov(input, maps, '.', output)
  .then(() => {
    console.log('Coverage Mapped!');
    process.exit(0);
  }).catch(err => {
    console.error(err.stack);
    process.exit(1);
  });
};

declare module mapCoverage {
  export interface IOptions {
    /**
     * Project root
     * @default CWD
     */
    cwd?: string;

    /**
     * Input coverage file (lcov)
     * @default coverage/lcov.info
     */
    input?: string;

    /**
     * Output coverage file (lcov)
     * @default coverage/lcov-mapped.info
     */
    output?: string;

    /**
     * Paths to exclude
     * @default 'node_modules/**'
     */
    exclude?: string | string[];

    /**
     * Extension of map files
     * @default .js.map
     */
    fileExtension?: string;
  }
}

export = mapCoverage;

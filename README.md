[![Build Status](https://travis-ci.org/chrisallenlane/drek.svg)](https://travis-ci.org/chrisallenlane/drek)
[![npm](https://img.shields.io/npm/v/drek.svg)]()
[![npm](https://img.shields.io/npm/dt/drek.svg)]()

drek
====
`drek` is a [static-code-analysis][sca] tool that can be used to perform
security-focused code reviews. It enables an auditor to swiftly map the
attack-surface of a large application, with an emphasis on identifying
development anti-patterns and footguns.

Much like `grep`, `drek` scans a codebase for user-defined regular-expressions.
Unlike `grep`, `drek` outputs its results into an ergonomic `html` report that
allows for sorting, filtering, and annotating of points-of-interest.

`drek` is the successor to `watchtower` ([project][wt-project],
[article][wt-article]).


Example
-------
Scan the codebase at `/path/to/app` for the signatures contained within
`/path/to/signatures/*.yml`:

```sh
drek /path/to/app -s '/path/to/signatures/*.yml' -p 'My App' > ./drek-report.html
```

### Interactive Examples ###
The following are reports on the [Damn Vulnerable Web Application][dvwa]:

- [Interactive HTML report][example-html] (save the file and open it locally)
- [PDF report][example-pdf]


Usage
-----
### Reports ###
`drek` can output points-of-interest as `csv`, `html`, `json`, or `xml`, though
the `html` report is the primary use-case.

The `html` report allows auditors to do the following:

- Categorize each point-of-interest by "severity".
- Filter points-of-interest by severity and filetype.
- Save annotations to `localStorage`.
- Export a PDF to share audit results.

### Signatures  ###
`drek` can be configured to scan for any user-defined regular-expressions on a
per-filetype basis via signature files.

Signature files are `yml` files that conform to a simple schema. See the
[drek-signatures][] repository for a collection of example signature files.


### Configuration ###
`drek` may optionally be configured via a `~/.drekrc` file
([example][drekrc-example]) as parsed by [rc][]. It accepts the following
values:

| Property     | Type   | Description                                                            |
| ------------ | ------ | -----------                                                            |
| `dateFormat` | string | Report date format, as parsed by [moment.js][].                        |
| `signatures` | array  | Path to `.yml` signature files to apply. (Accepts [glob][] wildcards.) |
| `ignore`     | array  | File paths to exclude from scan. (Accepts [glob][] wildcards.)         |


[drek-signatures]: https://github.com/chrisallenlane/drek-signatures
[drekrc-example]: https://github.com/chrisallenlane/drek/blob/master/drekrc-example
[dvwa]:           http://www.dvwa.co.uk/
[example-html]:   https://raw.githubusercontent.com/chrisallenlane/drek/master/example/example-report.html
[example-pdf]:    https://github.com/chrisallenlane/drek/blob/master/example/example-report.pdf
[glob]:           https://www.npmjs.com/package/glob
[moment.js]:      https://momentjs.com/
[rc]:             https://www.npmjs.com/package/rc
[sca]:            https://en.wikipedia.org/wiki/Static_program_analysis
[signatures]:     https://github.com/chrisallenlane/drek-signatures
[wt-article]:     https://chris-allen-lane.com/blog/post/static-code-analysis-using-watchtower
[wt-project]:     https://github.com/chrisallenlane/watchtower

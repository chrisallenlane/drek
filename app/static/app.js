document.addEventListener('DOMContentLoaded', function(event) {

  // KLUDGE: this is disgusting
  var saved = localStorage.getItem(storage);
  if (saved) {
    matches = JSON.parse(saved);
  }

  // component for individual matches
  Vue.component('matches', {
    props    : [ 'match' ],
    template : '#match',

    methods  : {

      // toggles match severity
      severity: function (value) {

        // clicking on a specific severity twice should set severity back to
        // 'unknown'
        this.match.severity = (this.match.severity === value)
          ? 'unknown'
          : value ;

        // emit a 'severity' event to trigger a save to localStorage
        this.$emit('severity');
      },

      // is invoked when notes are added to a match
      annotate: function () {
        // emit an 'annotate' event to trigger a save to localStorage
        this.$emit('annotate');
      }
    },

  });

  // entire Vue app
  var app = new Vue({
    el: '#app',
    data: {
      filetype   : filetype,
      filetypes  : filetypes,
      matches    : matches,
      searches   : searches,
      severities : severities,
      show       : {
        ok       : true,
        warn     : true,
        critical : true,
        unknown  : true,
      },
    },

    computed: {

      // structure the matches into groups by filetype and search string
      groups: function () {

        // return matches for all filetypes
        if (this.filetype === 'all') {
          return _(matches)
            .groupBy('search')
            .toPairs()
            .value();
        }

        // return matches for the specified filetype only
        return _(matches)
          .filter({ filetype: this.filetype })
          .groupBy('search')
          .toPairs()
          .value();
      },

      // filter the "match" menu links by filetype
      filteredSearches: function () {
        return (this.filetype === 'all')
          ? this.searches
          : _(this.searches)
            .filter({ filetype: this.filetype })
            .value();
      },

    },

    methods: {

      // filter matches by filetype
      filterFiletype: function (e) {
        this.filetype = e.target.getAttribute('data-filetype');
      },

      // filter matches by severity
      filterSeverity: function (e) {
        var severity = e.target.getAttribute('data-severity');
        this.show[severity] = !this.show[severity];
      },

      // shows/hides sections
      hideSection: function (e) {
        var section = e.target.parentElement.parentElement;
        var show    = (section.getAttribute('data-show') === 'true')
          ? 'false'
          : 'true';
        var text    = (e.target.text === 'Hide')
          ? 'Show'
          : 'Hide';

        e.target.text = text;
        section.setAttribute('data-show', show);
      },

      // save match state to localStorage
      save: function () {
        localStorage.setItem(
          storage,
          JSON.stringify(this.matches)
        );
      }

    },

  });
});

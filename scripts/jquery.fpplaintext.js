(function($){
  "use strict";
  /**
   * Foundation-Pygments Plain Text plugin
   *
   * Pygments is great, but showing line numbers while enabling the
   * reader to copy the text is problematic (the table option is kind of
   * mediocre for styling reasons...) This jquery plugin works around this.
   *
   * Foundation tabs implmented using Zurbs accessibility strategy.
   *
   * @see http://foundation.zurb.com/docs/components/tabs.html
   * @todo Can't tab to inactive tab...
   */
  $.fn.fpPlainText = function ($element, overrides) {
    // Configurable options. These give developers options, but aside from the id
    // attributes they're quite specific to foundation. With any luck, they're
    // complete enough to allow this plugin to be used with other, similar
    // markup...
    var defaults = {
      pygmentsId: 'pygments-%d',
      plaintextId: 'plaintext-%d',
      tabsNav: '<dl class="tabs" data-tab role="tablist"/>',
      highlightTab: '<a href="#%s" role="tab" tabindex="0" aria-selected="true" controls="%s">Highlighted</a>',
      plaintextTab: '<a href="#%s" role="tab" tabindex="-1" aria-selected="false" controls="%s">Plain text</a>',
      highlightWrap: '<dd role="presentational" class="active"></div>',
      plaintextWrap: '<dd role="presentational"></div>',
      tabsContentWrap: '<div class="tabs-content"></div>'
    },
    // Merge configurable options with overrides:
    settings = $.extend({}, defaults, overrides);
    // Return for chaining:
    return this.each(function (i, e) {
      // Variables for this individual element:
      //
      // -- the current element
      // -- a clone of it
      // -- the ccurrent, unique pygments and plaintext id attribute values
      // -- the current hightlight and plaintext tab link elements
      var $current = $(this),
          $clone = $current.clone(),
          pygmentsId = settings.pygmentsId.replace(/%d/, i),
          plaintextId = settings.plaintextId.replace(/%d/, i),
          highlightTab = settings.highlightTab.replace(/%s/g, pygmentsId),
          plaintextTab = settings.plaintextTab.replace(/%s/g, plaintextId);
      // Build the tabs nav first:
      $(settings.tabsNav)
        // Build and append the highlight tab:
        .append($(settings.highlightWrap).html(highlightTab))
        // Likewise for the plaintext tab:
        .append($(settings.plaintextWrap).html(plaintextTab))
        // Add the whole menu to the document:
        .insertBefore($current);
      // Go to work on the current element; we need to add Foundation tabs
      // class, id, role and aria-hidden attributes:
      $current
        .addClass('content active')
        .attr({
          id: pygmentsId,
          role: 'tabpanel',
          'aria-hidden': false
        });
      // Similarly for the plaintext element, *but* at the end, we add the
      // $current collection to this collection and wrap the whole works using the
      // tabsContentWrap:
      $clone
        .addClass('content plain')
        .attr({
          id: plaintextId,
          role: 'tabpanel',
          'aria-hidden': true
        })
        .find('pre')
        .text(
          $clone
            .find('.lineno')
            .remove()
            .end()
            .text()
          )
        .end()
        .insertAfter($current)
        .add($current)
        .wrapAll(settings.tabsContentWrap);
    });
  }; /* $fn.fpPlainText */
})(jQuery);

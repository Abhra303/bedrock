/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

(function (Mozilla) {
    'use strict';

    var href = window.location.href;

    var initTrafficCop = function () {
        if (href.indexOf('entrypoint_experiment=vpn-landing-page-download-first&entrypoint_variation=') !== -1) {
            if (href.indexOf('entrypoint_variation=a') !== -1) {
                window.dataLayer.push({
                    'data-ex-variant': 'a',
                    'data-ex-name': 'vpn-landing-page-download-first'
                });
            } else if (href.indexOf('entrypoint_variation=b') !== -1) {
                window.dataLayer.push({
                    'data-ex-variant': 'b',
                    'data-ex-name': 'vpn-landing-page-download-first'
                });
            }
        } else {
            var cop = new Mozilla.TrafficCop({
                id: 'vpn-landing-page-sub-position-experiment',
                variations: {
                    'entrypoint_experiment=vpn-landing-page-download-first&entrypoint_variation=a': 50,
                    'entrypoint_experiment=vpn-landing-page-download-first&entrypoint_variation=b': 50
                }
            });

            cop.init();
        }
    };

    // Avoid entering automated tests into random experiments.
    // Experiment targets Windows and macOS only.
    if (href.indexOf('automation=true') === -1 && window.site && (window.site.platform === 'windows' || window.site.platform === 'osx')) {
        initTrafficCop();
    }

})(window.Mozilla);

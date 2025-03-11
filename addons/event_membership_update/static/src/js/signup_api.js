odoo.define('event_membership_update.signup_api', function (require) {
    "use strict";

    var ajax = require('web.ajax');

    $(document).ready(function () {
        function fetchOptions(url, selector) {
            $.get(url, function (data) {
                var select = $(selector);
                select.empty().append('<option value="">Select</option>');
                $.each(data, function (index, item) {
                    select.append(`<option value="${item.id}">${item.name}</option>`);
                });
            });
        }

        // Load Regions
        fetchOptions('/api/regions', '#region_id');

        // Load Provinces when Region changes
        $('#region_id').change(function () {
            var regionId = $(this).val();
            fetchOptions(`/api/provinces?region_id=${regionId}`, '#province_id');
        });

        // Load Cities when Province changes
        $('#province_id').change(function () {
            var provinceId = $(this).val();
            fetchOptions(`/api/cities?province_id=${provinceId}`, '#city_id');
        });

        // Load Barangays when City changes
        $('#city_id').change(function () {
            var cityId = $(this).val();
            fetchOptions(`/api/barangays?city_id=${cityId}`, '#barangay_id');
        });
    });
});

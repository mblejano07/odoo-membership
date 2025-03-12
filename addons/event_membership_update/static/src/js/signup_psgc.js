odoo.define('event_membership.signup_psgc', function (require) {
    "use strict";

    var ajax = require('web.ajax');

    $(document).ready(function () {
        loadRegions();

        // Load Provinces when a Region is selected
        $('#region_id').on('change', function () {
            var regionId = $(this).val();
            $('#province_id').html('<option value="">Select Province</option>'); 
            $('#city_id').html('<option value="">Select City</option>'); 
            $('#barangay_id').html('<option value="">Select Barangay</option>'); 

            if (regionId) {
                loadProvinces(regionId);
            }
        });

        // Load Cities when a Province is selected
        $('#province_id').on('change', function () {
            var provinceId = $(this).val();
            $('#city_id').html('<option value="">Select City</option>'); 
            $('#barangay_id').html('<option value="">Select Barangay</option>');

            if (provinceId) {
                loadCities(provinceId);
            }
        });

        // Load Barangays when a City is selected
        $('#city_id').on('change', function () {
            var cityId = $(this).val();
            $('#barangay_id').html('<option value="">Select Barangay</option>');

            if (cityId) {
                loadBarangays(cityId);
            }
        });
    });

    // Load Regions
    function loadRegions() {
        ajax.jsonRpc('/api/psgc/regions', 'call', {}).then(function (data) {
            $.each(data, function (index, region) {
                $('#region_id').append('<option value="' + region.id + '">' + region.name + '</option>');
            });
        });
    }

    // Load Provinces
    function loadProvinces(regionId) {
        ajax.jsonRpc('/api/psgc/provinces/' + regionId, 'call', {}).then(function (data) {
            $.each(data, function (index, province) {
                $('#province_id').append('<option value="' + province.id + '">' + province.name + '</option>');
            });
        });
    }

    // Load Cities
    function loadCities(provinceId) {
        ajax.jsonRpc('/api/psgc/cities/' + provinceId, 'call', {}).then(function (data) {
            $.each(data, function (index, city) {
                $('#city_id').append('<option value="' + city.id + '">' + city.name + '</option>');
            });
        });
    }

    // Load Barangays
    function loadBarangays(cityId) {
        ajax.jsonRpc('/api/psgc/barangays/' + cityId, 'call', {}).then(function (data) {
            $.each(data, function (index, barangay) {
                $('#barangay_id').append('<option value="' + barangay.id + '">' + barangay.name + '</option>');
            });
        });
    }
});

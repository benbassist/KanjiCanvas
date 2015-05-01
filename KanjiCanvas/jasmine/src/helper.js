var helper = (function(){
    'use strict';

    var helper = {
        max: function () {
            var i, nums = Array.prototype.slice.call(arguments);
            for(i = 0; i < nums.length; i++) {
                if(isNaN(nums[i])) {
                    nums.splice(i,1);
                }
            }
            return nums.length == 0 ? NaN : Math.max.apply(null,nums);
        },
        min: function () {
            var i, nums = Array.prototype.slice.call(arguments);
            for(i = 0; i < nums.length; i++) {
                if(isNaN(nums[i])) {
                    nums.splice(i,1);
                }
            }
            return nums.length == 0 ? NaN : Math.min.apply(null,nums);
        }
    };
    return helper;
})();
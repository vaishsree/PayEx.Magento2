/*jshint browser:true jquery:true*/
/*global define*/
define(
    [
        'Magento_Checkout/js/model/quote',
        'Magento_Checkout/js/model/full-screen-loader',
        'jquery',
        'Magento_Checkout/js/action/get-totals'
    ],
    function (quote, fullScreenLoader, jQuery, getTotalsAction) {
        'use strict';
        return function (paymentMethod) {

            quote.paymentMethod(paymentMethod);

            if (window.checkoutConfig.payexPaymentFee.isEnabled) {
                fullScreenLoader.startLoader();
                return jQuery.ajax(window.checkoutConfig.payex.apply_pm_url, {
                    data: {
                        payment_method: paymentMethod
                    },
                    complete: function () {
                        getTotalsAction([]);
                        fullScreenLoader.stopLoader();
                    }
                });
            }

            return {
                done: function (callback) {
                    callback();
                }
            };
        }
    }
);

;(function($){
        
    $(document).on('click', '.wcajaxpaged-pagination a', function(e){
        e.preventDefault();
        
        //Make wordpress ajax
        var $this = $(this);
        var $parent = $this.closest('.wcajaxpaged-pagination');
        var $ajaxurl = wcajaxpaged_ajax_object.ajax_url;
        var $paged = $(this).text();
        '&rarr;' == $paged ? $paged = wcajaxpaged_ajax_object.paged++ : $paged = $paged;
        '&larr;' == $paged ? $paged = wcajaxpaged_ajax_object.paged-- : $paged = $paged;
        wcajaxpaged_ajax_object.paged = $paged;

        $order = $('.woocommerce-ordering select.orderby').val();
        
        console.log($order);

        var $data = {
            paged : $(this).text(),
            orderby : $order,
            action: 'wcajaxpaged_pagination',
            security: wcajaxpaged_ajax_object.wcajaxpaged_nonce,
        };


        //Call the ajax
        $.post($ajaxurl, $data, function(response){
            response = JSON.parse(response);
            console.log(response.pagination);
             $('nav.woocommerce-pagination.wcajaxpaged-pagination').html(response.pagination);
             $('ul.products.columns-3').html(response.html);
             $('.woocommerce-result-count').remove();
        }), 'json';

    }



);


$(document).ready(function(){
    $(".woocommerce-ordering").off("change","select.orderby").on("change","select.orderby", function(e){
        e.preventDefault();
        var $order = $(this).val();
        var $ajaxurl = wcajaxpaged_ajax_object.ajax_url;      
        var $data = {
            orderby : $order,
            action: 'wcajaxpaged_pagination',
            security: wcajaxpaged_ajax_object.wcajaxpaged_nonce,
        };

        //Call the ajax
        $.post($ajaxurl, $data, function(response){
            response = JSON.parse(response);
            $('nav.woocommerce-pagination.wcajaxpaged-pagination').html(response.pagination);
            $('ul.products.columns-3').html(response.html);
            $('.woocommerce-result-count').remove();
        }), 'json';
        
    });
    

    

});







})(jQuery);
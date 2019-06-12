
$(document).ready(function(){
    $('.removeBook').click(function(e){
        deleteId =$(this).data('id');
        $.ajax({
            url:'/manage/books/delete/' + deleteId,
            type: 'DELETE',
            success: function(){}
        });
        window.location = '/manage/books';
    });


     $('.removeCategories').click(function(e){
        deleteId =$(this).data('id');
        $.ajax({
            url:'/manage/categories/delete/' + deleteId,
            type: 'DELETE',
            success: function(){}
        });
        window.location = '/manage/categories';
    });
});

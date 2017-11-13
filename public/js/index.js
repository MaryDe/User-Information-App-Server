$(document).ready(function(){
    setTimeout(function(){
        // displaying and clicking suggestion
        $('.search').keyup(function(e) {

            var name = $('.search').val()
            console.log(name);
            if(name === ' ' || e.keyCode === 8){
                $('.username').html("<ul class = 'content'></ul><p class = 'display'></p>")
            }
            else if (name !== '') {
               
               // Part 2: Bandwidth optimization
                // Modify your form again so that AJAX requests happen at most once every 300 milliseconds. 
                $.get('/suggest', { text: name }, function(data) {
                    console.log(data.output);
                    var users = data.output;
                    var content = ""
                    for (var user in users) {
                        content = content + `<li><a>${users[user].firstname}</a></li><br>`
                    }

                    $('.content').html(content)
                    $('li').click(function() {

                        var selected = $(this).text();
                        $('.search').val(selected);
                        $('.content').html("");
                        $('.suggest').click(function() {
                            var something = users.find(function(index) {
                                return index.firstname === selected;
                            })
                            console.log(something);
                            $('.display').html(`<b>User Match<b><br>FirstName: ${something.firstname}<br> LastName:${something.lastname}<br> Email:${something.email}<br/>`)
                            setTimeout(function(){
                                $('.display').html("");
                            },4000)
                        })

                    })


                })
            }
        })

    },300)
})


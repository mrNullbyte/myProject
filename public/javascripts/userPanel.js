$(document).ready(function () {
    
    
    $.ajax({
        
        url: '/api/user/show',
        type: 'GET',
            
         success: function(data) {
            myCallback(data)
             console.log(data);
             if(result.users.avatar===undefined||result.users.avatar===""){
                $("#userAvatar").attr('src', '../uploads/download.png')
            }else{
                $("#userAvatar").attr('src', '../uploads/' + result.users.avatar + '')
    
            }  
            $("#firstName").append(result.users.userName)
             
         }
       
    })
    function myCallback(response) {
        result = response;
        console.log(result.users);                
        $("#Dashboard").click(function () {
            console.log("redirect to dashboard");
            $.ajax({
                url: '/api/panel',
                type: 'post',
                dataType:'json',
                contentType: 'application/json',
                success: function (data) {
                    console.log(data);
                
                },
                data: result.users
            })
        })
    }

    $("#showInfoUsers").click(function () {
        //  e.preventDefault();
        //  $("tbody #trRow").remove();
        $("#tbodyUser").find("tr").remove();
        $("#theadUser").find("th").remove();

        $.ajax({
            url: 'user/show',
            type: 'GET',
            success: function (result) {
                console.log(result.users);
                
                if(result.users.avatar===undefined||result.users.avatar===""){
                    $("#userAvatar").attr('src', '../uploads/download.png')
                }else{
                    $("#userAvatar").attr('src', '../uploads/' + result.users.avatar + '')

                }  
                $("#tbodyUser").append("<tr id='tr_'></tr>");
                for (let key in result.users) {
                    // console.log(result.users);
                    $("#theadUser").append("<th data-" + key + ">" + key + "</th>")
                    if (key === 'avatar') {
                        $("#tr_").append("<td id='tr_" + key + "_" + result.users[key] + "'><img id='avatar' src='../uploads/" + result.users[key] + "'></td>");
                    } else {
                        $("#tr_").append("<td id='tr_" + key + "_" + result.users[key] + "'>" + result.users[key] + "</td>");

                    }
                }
                $("#theadUser").append("<th  id='th'>Action</th>")
                $('#tr_').append("<td><button class='btn btn-info btn-xs btn-edit' id='editUsers' type='submit'>Edit</button> <button class='btn btn-danger btn-xs btn-delete' id='deleteUsers' type='submit'>Delete</button></td>")
            },
            error: function (err) {
                console.log(err);
            }
        })
    })
    
    // $("#showArticlesUsers").click(function () {
    //     $.ajax({
    //         url: 'user/addArticle',
    //         type: 'GET',
    //         success: function (result) {
    //             console.log("behnam") 
    //             // $("#userAvatar").attr('src', '../uploads/' + result.users.avatar + '')
    //             // $("#tbodyUser").append("<tr id='tr_'></tr>");
    //             // for (let key in result.users) {
    //             //     // console.log(result.users);
    //             //     $("#theadUser").append("<th data-" + key + ">" + key + "</th>")
    //             //     if (key === 'avatar') {
    //             //         $("#tr_").append("<td id='tr_" + key + "_" + result.users[key] + "'><img id='avatar' src='../uploads/" + result.users[key] + "'></td>");
    //             //     } else {
    //             //         $("#tr_").append("<td id='tr_" + key + "_" + result.users[key] + "'>" + result.users[key] + "</td>");

    //             //     }
    //             // }
    //             // $("#theadUser").append("<th  id='th'>Action</th>")
    //             // $('#tr_').append("<td><button class='btn btn-info btn-xs btn-edit' id='editUsers' type='submit'>Edit</button> <button class='btn btn-danger btn-xs btn-delete' id='deleteUsers' type='submit'>Delete</button></td>")
    //         },
    //         error: function (err) {
    //             console.log(err);
    //         }
    //     })
    // })


    $("body").on("click", "#editUsers", function (e) {
        e.preventDefault();
        var firstName = $(this).parents('tr').find("td:eq(1)").text();
        var lastName = $(this).parents('tr').find("td:eq(2)").text();
        var userName = $(this).parents('tr').find("td:eq(3)").text();
        var mobile = $(this).parents('tr').find("td:eq(4)").text();
        var password = $(this).parents('tr').find("td:eq(5)").text();
        var Gender = $(this).parents('tr').find("td:eq(6)").text();
        // console.log(firstName);


        $(this).parents('tr').find("td:eq(1)").html('<input name="firstName" value="' + firstName + '">');
        $(this).parents('tr').find("td:eq(2)").html('<input name="lastName" value="' + lastName + '">');
        $(this).parents('tr').find("td:eq(3)").html('<input name="userName" value="' + userName + '">');
        $(this).parents('tr').find("td:eq(4)").html('<input name="mobile" value="' + mobile + '">');
        $(this).parents('tr').find("td:eq(5)").html('<input name="password" value="' + password + '">');
        $(this).parents('tr').find("td:eq(6)").html('<input name="Gender" value="' + Gender + '">');
        $(this).parents('tr').find("#deleteUsers").hide();
        $(this).parents("tr").find("td:last").prepend("<button class='btn btn-info btn-xs btn-update' id='updateUsers'>Update</button><button class='btn btn-warning btn-xs btn-cancel' id='cancelUsers'>Cancel</button>")
        $(this).hide();
        console.log("edit Users")

    });


    $("body").on("click", "#updateUsers", function () {
        // console.log($(this).parents("tr").find("input[name = firstName]").val());
        let firstName = $(this).parents("tr").find("input[name = firstName]").val();
        let lastName = $(this).parents("tr").find("input[name = lastName]").val();
        let userName = $(this).parents("tr").find("input[name = userName]").val();
        let mobile = $(this).parents("tr").find("input[name = mobile]").val();
        let Gender = $(this).parents("tr").find("input[name = Gender]").val();

        let passwordLenght = $(this).parents("tr").find("input[name = password]").val().length;
        if (passwordLenght <= 8 || passwordLenght >= 20) {
            alert("password lenght is not valid");
            console.log($(this).parents('tr').find("td:eq(5)").innerHTML);

        } else {

            let password = $(this).parents("tr").find("input[name = password]").val();
            $.ajax({
                url: 'user/editUsers',
                type: 'post',
                dataType: 'json',
                contentType: 'application/json',
                success: function (data) {
                    console.log(data);
                },
                data: JSON.stringify({
                    firstname: firstName,
                    lastname: lastName,
                    userName: userName,
                    mobile: mobile,
                    password: password,
                    Gender: Gender
                })
            });
        }



    });

    $("body").on("click", "#updateUsers", function (e) {
        e.preventDefault();

        $(this).parents('tr').find("td:eq(1)").text($("input[name = firstName]").val());
        $(this).parents('tr').find("td:eq(2)").text($("input[name = lastName]").val());
        $(this).parents('tr').find("td:eq(3)").text($("input[name = userName]").val());
        $(this).parents('tr').find("td:eq(4)").text($("input[name = mobile]").val());
        $(this).parents('tr').find("td:eq(5)").text($("input[name = password]").val());
        $(this).parents('tr').find("td:eq(6)").text($("input[name = Gender]").val());
        $(this).parents('tr').find("#deleteUsers").show();
        $(this).parents('tr').find("#editUsers").show();

        $("#updateUsers").remove();
        $("#cancelUsers").remove();
        console.log("update users");
    });


    $("body").on("click", "#cancelUsers", function (e) {
        e.preventDefault();

        $(this).parents('tr').find("#editUsers").show();
        $(this).parents('tr').find("td:eq(1)").text($("input[name = firstName]").val())
        $(this).parents('tr').find("td:eq(2)").text($("input[name = lastName]").val())
        $(this).parents('tr').find("td:eq(3)").text($("input[name = userName]").val())
        $(this).parents('tr').find("td:eq(4)").text($("input[name = mobile]").val())
        $(this).parents('tr').find("td:eq(5)").text($("input[name = password]").val())
        $(this).parents('tr').find("td:eq(6)").text($("input[name = Gender]").val())
        // console.log($("input[name = firstName]").val());
        $(this).parents('tr').find("#deleteUsers").show();

        $("#updateUsers").remove();
        $("#cancelUsers").remove();
        console.log("cancel users");
    });

    // $("body").on("click", "#deleteUsers" , function () {
    //     // console.log($(this).parents("tr").find("td:eq(2)").text());

    //     let  datauser={mobile:$(this).parents("tr").find("td:eq(2)").text()};
    //     $(this).parents("tr").remove();
    // //    let b= $(this);
    // //     console.log(b[0]);
    //     // console.log(datauser);
    //     console.log("delete users"); 
    //         $.ajax({
    //             method: "DELETE"
    //             , url: "user/deleteUser"  
    //             , data: datauser
    //             , success: function (data) {
    //                 console.log(data);

    //             } 
    //         })
    //         $.ajax({
    //             method: "GET"
    //             , url: "user/deleteUser"  
    //             , data: datauser
    //             , success: function (data) {
    //                 console.log(data);

    //             } 
    //         })

    // });
    // $("body").on("click", "#upload", function (e) { 
    //     e.preventDefault();
    //     $.ajax({
    //         url: 'api/uploads',
    //         type: 'POST',
    //         dataType: 'json',
    //         contentType: 'application/json',
    //         success: function (data) {
    //             console.log(data);    
    //         },
    //         data: JSON.stringify({
    //             avatar: req.file.filename
    //         })
    //     });
    // })
    // $("#showArticlesUsers").click(function () {
    //     console.log("article");
    //     // console.log($("#message").hide("slow"));
    //     // $("#message").hide("fast");
    //     // $("#message").css("visibility", "hidden");
    //     $("#message").css('visibility','hidden');
    //     $(".a").css('visibility','hidden');
    //     $(".b").css('visibility','hidden');
    //     $(".c").css('visibility','hidden');
    //     $(".d").css('visibility','hidden');
    //     $(".e").css('visibility','hidden');
    //     $(".f").css('visibility','hidden');
    //     $(".g").css('visibility','hidden');
    //     $.ajax({
    //         url: 'user/showArticle',
    //         type: 'GET',
    //         success: function (result) {
    //             console.log(result);
    //             console.log("fine");
                
    //             // $("#tbodyUser").append("<tr id='tr_'></tr>");
    //             // for (let key in result.users) {
    //             //     // console.log(result.users);
    //             //     $("#theadUser").append("<th data-" + key + ">" + key + "</th>")
    //             //     if (key === 'avatar') {
    //             //         $("#tr_").append("<td id='tr_" + key + "_" + result.users[key] + "'><img id='avatar' src='../uploads/" + result.users[key] + "'></td>");
    //             //     } else {
    //             //         $("#tr_").append("<td id='tr_" + key + "_" + result.users[key] + "'>" + result.users[key] + "</td>");

    //             //     }
    //             // }
    //             // $("#theadUser").append("<th  id='th'>Action</th>")
    //             // $('#tr_').append("<td><button class='btn btn-info btn-xs btn-edit' id='editUsers' type='submit'>Edit</button> <button class='btn btn-danger btn-xs btn-delete' id='deleteUsers' type='submit'>Delete</button></td>")
    //         },
    //         error: function (err) {
    //             console.log(err);
    //         }
    //     })
    // })


    // $("body").on("click", "#sendArticle", function (e) {
    //     e.preventDefault(); 
    //     // console.log($("#title").val());
    //     let title =$("#title").val();
    //     let content = $("#content").val();
    //     // let userName = $(this).parents("tr").find("input[name = userName]").val();
    //     // let mobile = $(this).parents("tr").find("input[name = mobile]").val();
    //     // let Gender = $(this).parents("tr").find("input[name = Gender]").val();

    //     // let passwordLenght = $(this).parents("tr").find("input[name = password]").val().length;
    //     // if (passwordLenght <= 8 || passwordLenght >= 20) {
    //     //     alert("password lenght is not valid");
    //     //     console.log($(this).parents('tr').find("td:eq(5)").innerHTML);

    //     // } else {

    //         // let password = $(this).parents("tr").find("input[name = password]").val();
    //         alert("save post!!!");
    //         $("#title").val("");
    //         $("#content").val("");
    //         $.ajax({
    //             url: '../user/addNewArticle',
    //             type: 'POST',
    //             dataType: 'json',
    //             contentType: 'application/json',
    //             success: function (data) {
    //                 console.log(data);
    //                 // console.log(countPost);
    //             },
    //             data: JSON.stringify({
    //                 // title:"behnam"
    //                 articleTitle : title,
    //                 articleContent: content,
    //                 // articleImage : "",
    //                 views : 10
    //                 // articleImage: lastName,
    //                 // views: userName,
    //                 // mobile: mobile,
    //                 // password: password,
    //                 // Gender: Gender
    //             })
    //         });
    //     // }



    // });



    $("#showpost").click(function () {
        //  e.preventDefault();\
        $("#showpostsuser").find('div').remove();
        $.ajax({
            url: '../user/viewArticle',
            type: 'GET',
            success: function (result) {
                // console.log(result);
                console.log(result.posts.length);
                console.log(result.userInfo);
                
            for(let i=0; i < result.posts.length; i++) { 
                $("#showpostsuser").append('<div class="col-12 col-md-6 col-xl-4 mt-5 d-flex justify-content-center"><div class="card" style="width: 18rem;"><img src="../../uploads/articleImage/'+result.posts[i].articleImage+'" class="card-img-top" alt="..."><div class="card-body"><h5 class="card-title">'+result.posts[i].articleTitle+' </h5><p class="card-text showMore">'+result.posts[i].articleContent+'</p></div><ul class="list-group list-group-flush"><li class="list-group-item">author name : '+result.userInfo.userName+' </li><li class="list-group-item" style="font-size: 12px;">create date : '+result.posts[i].created_at.slice(0,10)+'</li><li hidden id="'+result.posts[i]._id+'" class="list-group-item ids"></li></ul><div class="card-body"><a class="btn btn-primary" href="../user/showpost'+result.posts[i]._id+'" role="button" id="moreInfo">more info</a><br><a class="btn green" href="#" role="button" data-toggle="modal" data-target="#exampleModal" >edit</a><button type="submit" class="btn red" href="#" role="button" id="deletePosts'+result.posts[i].articleTitle+'_'+i+'">delete</button></div></div></div>');
                
                // $("#messages-view-post").append('behnam');
                    }
                    },
            error: function (err) {
                console.log(err);
            }
        })
    })

    $("#showallpost").click(function () {
        //  e.preventDefault();\
        $("#showallpostsuser").find('div').remove();
        $.ajax({
            url: '../user/viewAllArticleUser',
            type: 'GET',
            success: function (result) {
                // console.log(result.posts.length);
                // console.log(result.user);
                
            for(let i=0; i < result.posts.length; i++) { 
                // console.log(result.posts[i].author_ID.userName);

                $("#showallpostsuser").append('<div class="col-12 col-md-6 col-xl-4 mt-5 d-flex justify-content-center"><div class="card" style="width: 18rem;"><img src="../../uploads/articleImage/'+result.posts[i].articleImage+'" class="card-img-top" alt="..."><div class="card-body"><h5 class="card-title">'+result.posts[i].articleTitle+' </h5><p class="card-text showMore">'+result.posts[i].articleContent+'</p></div><ul class="list-group list-group-flush"><li class="list-group-item">author name : '+result.posts[i].author_ID.userName+' </li><li class="list-group-item" style="font-size: 12px;">create date : '+result.posts[i].created_at.slice(0,10)+'</li><li hidden id="'+result.posts[i]._id+'" class="list-group-item ids"></li></ul><div class="card-body"><a class="btn btn-primary" href="../user/showpost'+result.posts[i]._id+'" role="button" id="moreInfo">more info</a><br></div></div></div>');
                
                // $("#messages-view-post").append('behnam');
                    }
                    },
            error: function (err) {
                console.log(err);
            }
        })
    })

    $("#showArticleSort").click(function (e) {
         e.preventDefault();
        $("#showallpostsuser").find('div').remove();
        $.ajax({
            url: '../user/viewArticleSort',
            type: 'GET',
            success: function (result) {
                // console.log(result);
                console.log(result.posts.length);
                console.log(result.user);
                
              for(let i=0; i < result.posts.length; i++) { 
                $("#showallpostsuser").append('<div class="col-12 col-md-6 col-xl-4 mt-5 d-flex justify-content-center"><div class="card" style="width: 18rem;"><img src="../../uploads/articleImage/'+result.posts[i].articleImage+'" class="card-img-top" alt="..."><div class="card-body"><h5 class="card-title">'+result.posts[i].articleTitle+' </h5><p class="card-text showMore">'+result.posts[i].articleContent+'</p></div><ul class="list-group list-group-flush"><li class="list-group-item">author name : '+result.posts[i].author_ID.userName+' </li><li class="list-group-item" style="font-size: 12px;">create date : '+result.posts[i].created_at.slice(0,10)+'</li><li hidden id="'+result.posts[i]._id+'" class="list-group-item ids"></li></ul><div class="card-body"><a class="btn btn-primary" href="../user/showpost" role="button">more info</a><br></div></div></div>');
                
                // $("#messages-view-post").append('behnam');
                    }
                    },
            error: function (err) {
                console.log(err);
            }
        })
    })


    $("#showArticleunSort").click(function (e) {
         e.preventDefault();
        $("#showallpostsuser").find('div').remove();
        $.ajax({
            url: '../user/viewAllArticleUser',
            type: 'GET',
            success: function (result) {
                // console.log(result);
                console.log(result.posts.length);
                console.log(result.user);       
                
              for(let i=0; i < result.posts.length; i++) { 
                $("#showallpostsuser").append('<div class="col-12 col-md-6 col-xl-4 mt-5 d-flex justify-content-center"><div class="card" style="width: 18rem;"><img src="../../uploads/articleImage/'+result.posts[i].articleImage+'" class="card-img-top" alt="..."><div class="card-body"><h5 class="card-title">'+result.posts[i].articleTitle+' </h5><p class="card-text showMore">'+result.posts[i].articleContent+'</p></div><ul class="list-group list-group-flush"><li class="list-group-item">author name : '+result.posts[i].author_ID.userName+' </li><li class="list-group-item" style="font-size: 12px;">create date : '+result.posts[i].created_at.slice(0,10)+'</li><li hidden id="'+result.posts[i]._id+'" class="list-group-item ids"></li></ul><div class="card-body"><a class="btn btn-primary" href="#" role="button">more info</a><br></div></div></div>');
                
                // $("#messages-view-post").append('behnam');
                    }
                    },
            error: function (err) {
                console.log(err);
            }
        })
    })


    $("body").on("click", ".red", function () {
        console.log("delete posts");
        let postId = $(this).closest('.card').children('.list-group').children('.ids').attr('id');
        console.log(postId);
        alert("Deleted post ?????!!!");
        location.reload();
        // $("#showpostsuser").find('div').remove();
        $.ajax({
            url: './deleteUserPost',
            type: 'post',
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                console.log(data);    
            },
            data: JSON.stringify({
                postId:postId
            })
        });
        // console.log($(this).attr('id'));
        
    })
    // <button type="button" class="btn btn-primary"  ></button>

    $("body").on("click", ".green", function () {
        $("#titlemodal").val("");
        $("#contentmodal").text("");
        console.log("edit post");
        let title = $(this).closest('.card').children('div:eq(0)').children('.card-title').text();        
        let content = $(this).closest('.card').children('div:eq(0)').children('.card-text').text(); 
        // console.log(title);
        // console.log(content);
        let postId = $(this).closest('.card').children('.list-group').children('.ids').attr('id');

        $("#titlemodal").val(title);
        $("#contentmodal").text(content);
        
        $("body").on("click", "#saveEditPost", function () {
            // console.log($("#titlemodal").val());
            console.log(postId);
            let  titlePost= $("#titlemodal").val();
            let contentPost=$("#contentmodal").val();
            $.ajax({
                url: '../user/editPosts',
                type: 'PUT',
                data: 
                    {titlePost,contentPost,postId}
                ,
                success: function(data) {

                }
              });
              alert("save edit!!!");
              $("#saveEditPost").attr('data-dismis','modal')
        })
        
    })

    $("body").on("click", "#moreInfo", function () {
        let postId = $(this).closest('.card').children('.list-group').children('.ids').attr('id');
        console.log(postId);
        $.ajax({
            url: '../user/showpost'+postId,
            type: 'GET',
            success: function (result) {
                console.log(result);
                
                    },
            error: function (err) {
                console.log(err);
            }
        })
        // $.ajax({
        //     url: '../user/showposts',
        //     type: 'post',
        //     dataType: 'json',
        //     contentType: 'application/json',    
        //     success: function (posts) {
        //         alert("fine");
        //         console.log(posts);    
        //     },
        //     data: JSON.stringify({
        //         postId:postId
        //     })
        // });
        // e.preventDefault();
    //    $("#showpostsuser").find('div').remove();
        
    })


    $("#addNewCommetn").click(function(e){
        e.preventDefault();
        console.log("add commnet posts user");
        let comment = $('#commentBox').val();
        let postId = $('#post').text();
        console.log(comment);
        console.log(postId);
        
        location.reload();
        $.ajax({
            url: './addNewCommetnUser',
            type: 'post',
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                console.log(data);
                $('#commentBox').val("");
            
            },
            data: JSON.stringify({
                comment: comment,
                postId:postId
            })
        });
        // console.log($(this).attr('id'));
    })


 















});
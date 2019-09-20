$(document).ready(function () {
//////////////////////////////////////////////////////////////////////////////////////////////
    $.ajax({
        url: '/admin',
        type: 'GET',
        success: function (result) {
            console.log(result);
            if(result.admin.avatar===undefined||result.admin.avatar===""){
                $("#userAvatar").attr('src', '../uploads/download.png')
            }else{
                $("#userAvatar").attr('src', '../uploads/' + result.admin.avatar + '')
    
            }  
            $("#firstName").append(result.admin.userName);
            $("#firstName").attr('style', 'font-size:12px;color:blue');


        },
        error: function (err) {
            console.log(err);
        }
    })

//////////////////////////////////////////////////////////////////////////////////////////////
    $("#showInfoAdmin").click(function () {
        $("#tbodyAdmin").find("tr").remove();
        $("#theadAdmin").find("th").remove();
        $.ajax({
            url: '/admin/show',
            type: 'GET',
            success: function (result) {
                console.log(result);

                if (result.users.avatar === undefined || result.users.avatar === "") {
                    $("#userAvatar").attr('src', '../uploads/download.png')
                } else {
                    $("#userAvatar").attr('src', '../uploads/' + result.users.avatar + '')

                }
                $("#tbodyAdmin").append("<tr id='tr_'></tr>");
                for (let key in result.users) {
                    // console.log(result.users);
                    $("#theadAdmin").append("<th data-" + key + ">" + key + "</th>")
                    if (key === 'avatar') {
                        if (result.users.avatar === undefined || result.users.avatar === "") {
                            $("#tr_").append("<td id='tr_" + key + "_" + result.users[key] + "'><img id='avatar' src='../uploads/download.png'></td>");

                        } else {
                            $("#tr_").append("<td id='tr_" + key + "_" + result.users[key] + "'><img id='avatar' src='../uploads/" + result.users[key] + "'></td>");
        
                        }
                    } else {
                        $("#tr_").append("<td id='tr_" + key + "_" + result.users[key] + "'>" + result.users[key] + "</td>");

                    }
                }
                $("#theadAdmin").append("<th  id='th'>Action</th>")
                $('#tr_').append("<td><button class='btn btn-info btn-xs btn-edit' id='editAdmin' type='submit'>Edit</button> <button class='btn orange btn-xs btn-delete' id='deleteAdmin' type='submit'>Delete</button></td>")
            },
            error: function (err) {
                console.log(err);
            }
        })
    })

//////////////////////////////////////////////////////////////////////////////////////////////
    $("#showUsersInfo").click(function () {
        $("#tbodyAdmin").find("tr").remove();
        $("#theadAdmin").find("th").remove();
        $.ajax({
            url: '/admin/showGetAllUsers',
            type: 'GET',
            success: function (result) {
                
                for (let key in result.users) {
                    console.log(result.users);
                    // if (result.users[key].avatar === undefined || result.users[key].avatar === "") {
                    //     // $("#td_"+key+"_avatar").attr('src', '../uploads/download.png')
                    //     console.log($("#tr_"+key+"").find("#td_"+key+"_avatar").attr());
                        
                    // } 
                    $("#tbodyAdmin").append("<tr id='tr_"+key+"'></tr>");
                    for (let keys in result.users[key] ) {
                        
                        if (keys === 'avatar') {
                            if (result.users[key].avatar === undefined || result.users[key].avatar === "") {
                                $("#tr_"+key+"").append("<td id='tr_"+key+"_"+keys+"'>"+result.users[key][keys] +"<img id='avatar' src='../uploads/download.png'></td>");

                            }else{
                                // $("#tr_"+key+"").append("<td id='tr_"+key+"_"+keys+"' data-"+keys+"='"+result.users[key][keys]+"'>"+result.users[key][keys] +"<img id='avatar' src='../uploads/" + result.users[key][keys] + "'></td>");
                                $("#tr_"+key+"").append("<td id='tr_" + key + "_" + keys + "'><img id='avatar' src='../uploads/" + result.users[key][keys] + "'></td>");

                            }
                    } else {
                            // $("#tr_"+key+"").append("<td id='tr_"+key+"_"+keys+"' data-"+keys+"='"+result.users[key][keys]+"'>"+result.users[key][keys]+"</td>");
                            $("#tr_"+key+"").append("<td id='tr_" + key + "_" + keys + "'>" +result.users[key][keys] + "</td>");

                        }
                    }
                    $('#tr_'+key+'').append("<td><button class='btn btn-info btn-xs btn-edit' id='editUserA' type='submit'>Edit</button> <button class='btn btn-danger btn-xs btn-delete' id='deleteUserA' type='submit'>Delete</button> <button class='btn btn-danger btn-xs btn-reset' id='resetPasswordUser' type='submit'>Reset Pass</button></td>")
                } 
                for( key in result.users) {
                    for(let val in result.users[key]){
                        // console.log(val);
                        $("#theadAdmin").append("<th data-" + val + ">" + val + "</th>")
                    }
                    $("#theadAdmin").append("<th  id='th'>Action</th>")
                // $('#tr_').append("<td><button class='btn btn-info btn-xs btn-edit' id='editAdmin' type='submit'>Edit</button> <button class='btn red btn-xs btn-delete' id='deleteAdmin' type='submit'>Delete</button></td>")
            
                    return;
                    
                }
                },
            error: function (err) {
                console.log(err);
            }
        })
    })

//////////////////////////////////////////////////////////////////////////////////////////////
    $("body").on("click", "#editAdmin", function (e) {
        e.preventDefault();
        var firstName = $(this).parents('tr').find("td:eq(1)").text();
        var lastName = $(this).parents('tr').find("td:eq(2)").text();
        var userName = $(this).parents('tr').find("td:eq(3)").text();
        var password = $(this).parents('tr').find("td:eq(4)").text();
        var mobile = $(this).parents('tr').find("td:eq(6)").text();
        var Gender = $(this).parents('tr').find("td:eq(7)").text();
        // console.log(firstName);


        $(this).parents('tr').find("td:eq(1)").html('<input name="firstName" value="' + firstName + '">');
        $(this).parents('tr').find("td:eq(2)").html('<input name="lastName" value="' + lastName + '">');
        $(this).parents('tr').find("td:eq(3)").html('<input name="userName" value="' + userName + '">');
        $(this).parents('tr').find("td:eq(4)").html('<input name="password" value="' + password + '">');
        $(this).parents('tr').find("td:eq(6)").html('<input name="mobile" value="' + mobile + '">');
        $(this).parents('tr').find("td:eq(7)").html('<input name="Gender" value="' + Gender + '">');
        $(this).parents('tr').find("#deleteAdmin").hide();
        $(this).parents("tr").find("td:last").prepend("<button class='btn btn-info btn-xs btn-update' id='updateAdmin'>Update</button><button class='btn red btn-xs btn-cancel' id='cancelAdmin'>Cancel</button>")
        $(this).hide();
        console.log("edit Admin")

    });
//////////////////////////////////////////////////////////////////////////////////////////////

    $("body").on("click", "#updateAdmin", function () {
        // console.log($(this).parents("tr").find("input[name = firstName]").val());
        let firstName = $(this).parents("tr").find("input[name = firstName]").val();
        let lastName = $(this).parents("tr").find("input[name = lastName]").val();
        let userName = $(this).parents("tr").find("input[name = userName]").val();
        let mobile = $(this).parents("tr").find("input[name = mobile]").val();
        let Gender = $(this).parents("tr").find("input[name = Gender]").val();

        let passwordLenght = $(this).parents("tr").find("input[name = password]").val().length;
        console.log(passwordLenght);

        if (passwordLenght < 8 || passwordLenght >= 20) {
            alert("password lenght is not valid");
            console.log($(this).parents('tr').find("td:eq(4)").innerHTML);

        } else {

            let password = $(this).parents("tr").find("input[name = password]").val();
            $.ajax({
                url: 'admin/editAdmin',
                type: 'post',
                dataType: 'json',
                contentType: 'application/json',
                success: function (data) {
                    console.log(data);
                },
                data: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    userName: userName,
                    mobile: mobile,
                    password: password,
                    Gender: Gender
                })
            });
        }



    });
    $("body").on("click", "#updateAdmin", function (e) {
        e.preventDefault();

        $(this).parents('tr').find("td:eq(1)").text($("input[name = firstName]").val());
        $(this).parents('tr').find("td:eq(2)").text($("input[name = lastName]").val());
        $(this).parents('tr').find("td:eq(3)").text($("input[name = userName]").val());
        $(this).parents('tr').find("td:eq(4)").text($("input[name = password]").val());
        $(this).parents('tr').find("td:eq(6)").text($("input[name = mobile]").val());
        $(this).parents('tr').find("td:eq(7)").text($("input[name = Gender]").val());
        $(this).parents('tr').find("#deleteAdmin").show();
        $(this).parents('tr').find("#editAdmin").show();

        $("#updateAdmin").remove();
        $("#cancelAdmin").remove();
        console.log("update admin");
    });
//////////////////////////////////////////////////////////////////////////////////////////////
    $("body").on("click", "#cancelAdmin", function (e) {
        e.preventDefault();

        $(this).parents('tr').find("#editAdmin").show();
        $(this).parents('tr').find("td:eq(1)").text($("input[name = firstName]").val())
        $(this).parents('tr').find("td:eq(2)").text($("input[name = lastName]").val())
        $(this).parents('tr').find("td:eq(3)").text($("input[name = userName]").val())
        $(this).parents('tr').find("td:eq(4)").text($("input[name = password]").val())
        $(this).parents('tr').find("td:eq(6)").text($("input[name = mobile]").val())
        $(this).parents('tr').find("td:eq(7)").text($("input[name = Gender]").val())
        // console.log($("input[name = firstName]").val());
        $(this).parents('tr').find("#deleteAdmin").show();

        $("#updateAdmin").remove();
        $("#cancelAdmin").remove();
        console.log("cancel Admin");
    });
//////////////////////////////////////////////////////////////////////////////////////////////
$("#showpostAdmin").click(function () {
    //  e.preventDefault();\
    $("#showAllPostAdmin").find('div').remove();
    $.ajax({
        url: '../admin/viewArticleAdmin',
        type: 'GET',
        success: function (result) {
            // console.log(result);
            console.log(result.posts);
            // console.log(result.userInfo);
            
        for(let i=0; i < result.posts.length; i++) { 
            $("#showAllPostAdmin").append('<div class="col-12 col-md-6 col-xl-4 mt-5 d-flex justify-content-center"><div class="card" style="width: 18rem;"><img src="../../uploads/articleImage/'+result.posts[i].articleImage+'" class="card-img-top" alt="..."><div class="card-body"><h5 class="card-title">'+result.posts[i].articleTitle+' </h5><p class="card-text showMore">'+result.posts[i].articleContent+'</p></div><ul class="list-group list-group-flush"><li class="list-group-item">author name : '+result.posts[i].author_ID.userName+' </li><li class="list-group-item" style="font-size: 12px;">create date : '+result.posts[i].created_at.slice(0,10)+'</li><li hidden id="'+result.posts[i]._id+'" class="list-group-item ids"></li></ul><div class="card-body"><a class="btn btn-primary" href="../admin/showpost'+result.posts[i]._id+'" role="button" id="moreInfo">more info</a><br><a class="btn green" href="#" role="button" data-toggle="modal" data-target="#exampleModal" >edit</a><button type="submit" class="btn red deletepostadmin" href="#" role="button" id="deletePostsAdmin_'+result.posts[i].articleTitle+'_'+i+'">delete</button></div></div></div>');
            
            // $("#messages-view-post").append('behnam');
                }
                },
        error: function (err) {
            console.log(err);
        }
    })
})

$("#showallpostAdmin").click(function () {
    //  e.preventDefault();\
    $("#showallpostsuser").find('div').remove();
    $.ajax({
        url: '../admin/viewAllArticleAdmin',
        type: 'GET',
        success: function (result) {
            // console.log(result.posts.length);
            // console.log(result.user);
            
        for(let i=0; i < result.posts.length; i++) { 
            // console.log(result.posts[i].author_ID.userName);

            $("#showallpostsuser").append('<div class="col-12 col-md-6 col-xl-4 mt-5 d-flex justify-content-center"><div class="card" style="width: 18rem;"><img src="../../uploads/articleImage/'+result.posts[i].articleImage+'" class="card-img-top" alt="..."><div class="card-body"><h5 class="card-title">'+result.posts[i].articleTitle+' </h5><p class="card-text showMore">'+result.posts[i].articleContent+'</p></div><ul class="list-group list-group-flush"><li class="list-group-item">author name : '+result.posts[i].author_ID.userName+' </li><li class="list-group-item" style="font-size: 12px;">create date : '+result.posts[i].created_at.slice(0,10)+'</li><li hidden id="'+result.posts[i]._id+'" class="list-group-item ids"></li></ul><div class="card-body"><a class="btn btn-primary" href="../admin/showpost'+result.posts[i]._id+'" role="button" id="moreInfo">more info</a><br><button type="submit" class="btn red deletepostadmin" href="#" role="button" id="deletePostsAdmin'+result.posts[i].articleTitle+'_'+i+'">delete</button></div></div></div>');
            
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
        url: '../admin/viewArticleSort',
        type: 'GET',
        success: function (result) {
            // console.log(result);
            console.log(result.posts.length);
            console.log(result.user);
            
          for(let i=0; i < result.posts.length; i++) { 
            $("#showallpostsuser").append('<div class="col-12 col-md-6 col-xl-4 mt-5 d-flex justify-content-center"><div class="card" style="width: 18rem;"><img src="../../uploads/articleImage/'+result.posts[i].articleImage+'" class="card-img-top" alt="..."><div class="card-body"><h5 class="card-title">'+result.posts[i].articleTitle+' </h5><p class="card-text showMore">'+result.posts[i].articleContent+'</p></div><ul class="list-group list-group-flush"><li class="list-group-item">author name : '+result.posts[i].author_ID.userName+' </li><li class="list-group-item" style="font-size: 12px;">create date : '+result.posts[i].created_at.slice(0,10)+'</li><li hidden id="'+result.posts[i]._id+'" class="list-group-item ids"></li></ul><div class="card-body"><a class="btn btn-primary" href="../admin/showpost'+result.posts[i]._id+'" role="button" id="moreInfo">more info</a><br><button type="submit" class="btn red deletepostadmin" href="#" role="button" id="deletePostsAdmin'+result.posts[i].articleTitle+'_'+i+'">delete</button></div></div></div>');
            
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
        url: '../admin/viewAllArticleAdmin',
        type: 'GET',
        success: function (result) {
            // console.log(result);
            console.log(result.posts.length);
            console.log(result.user);       
            
          for(let i=0; i < result.posts.length; i++) { 
            $("#showallpostsuser").append('<div class="col-12 col-md-6 col-xl-4 mt-5 d-flex justify-content-center"><div class="card" style="width: 18rem;"><img src="../../uploads/articleImage/'+result.posts[i].articleImage+'" class="card-img-top" alt="..."><div class="card-body"><h5 class="card-title">'+result.posts[i].articleTitle+' </h5><p class="card-text showMore">'+result.posts[i].articleContent+'</p></div><ul class="list-group list-group-flush"><li class="list-group-item">author name : '+result.posts[i].author_ID.userName+' </li><li class="list-group-item" style="font-size: 12px;">create date : '+result.posts[i].created_at.slice(0,10)+'</li><li hidden id="'+result.posts[i]._id+'" class="list-group-item ids"></li></ul><div class="card-body"><a class="btn btn-primary" href="../admin/showpost'+result.posts[i]._id+'" role="button" id="moreInfo">more info</a><br><button type="submit" class="btn red deletepostadmin" href="#" role="button" id="deletePostsAdmin'+result.posts[i].articleTitle+'_'+i+'">delete</button></div></div></div>');
            
            // $("#messages-view-post").append('behnam');
                }
                },
        error: function (err) {
            console.log(err);
        }
    })
})
//////////////////////////////////////////////////////////////////////////////////////////////
    $("body").on("click", ".deletepostadmin", function () {
        console.log("delete posts");
        let postId = $(this).closest('.card').children('.list-group').children('.ids').attr('id');
        console.log(postId);
        alert("Deleted post ?????!!!");
        location.reload();
        // $("#showpostsuser").find('div').remove();
        $.ajax({
            url: './deleteAdminPost',
            type: 'post',
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                console.log(data);
            },
            data: JSON.stringify({
                postId: postId
            })
        });
        // console.log($(this).attr('id'));

    })
//////////////////////////////////////////////////////////////////////////////////////////////
    $("body").on("click", ".green", function () {
        $("#titlemodal").text("");
        $("#contentmodal").text("");
        console.log("edit post");
        let title = $(this).closest('.card').children('div:eq(0)').children('.card-title').text();
        let content = $(this).closest('.card').children('div:eq(0)').children('.card-text').text();
        let postId = $(this).closest('.card').children('.list-group').children('.ids').attr('id');

        $("#titlemodal").val(title);
        $("#contentmodal").text(content);

        $("body").on("click", "#saveEditPost", function () {
            // console.log($("#titlemodal").val());
            console.log(postId);
            let titlePost = $("#titlemodal").val();
            let contentPost = $("#contentmodal").val();
            $.ajax({
                url: '../admin/editPosts',
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                success: function (data) {
                    console.log(data);
                    
                },
                data: JSON.stringify({
                    postId: postId,
                    titlePost:titlePost,
                    contentPost:contentPost,
                    
                })
            });
            alert("save edited!!!");
            $("#saveEditPost").attr('data-dismis', 'modal')
            location.reload();
        })

    })
//////////////////////////////////////////////////////////////////////////////////////////////
    $("body").on("click", "#moreInfo", function () {
        let postId = $(this).closest('.card').children('.list-group').children('.ids').attr('id');
        console.log(postId);
        $.ajax({
            url: '../admin/showpost' + postId,
            type: 'GET',
            success: function (result) {
                console.log(result);

            },
            error: function (err) {
                console.log(err);
            }
        })
        
    })
//////////////////////////////////////////////////////////////////////////////////////////////
    // $("#dashboard").click(function(){
        
    //     $.ajax({
    //         url: '/api/panel',
    //         type: 'POST',
    //         dataType: 'json',
    //         contentType: 'application/json',
    //         success: function (result) {
    //             console.log(result);

    //         },
    //         data: JSON.stringify({
                
    //         })
    //     })
    // })
////////////////////////////////////////////***************User***************//////////////////////////////////////////////////
$("body").on("click", "#editUserA", function (e) {
    e.preventDefault();
    var firstName = $(this).parents('tr').find("td:eq(1)").text();
    var lastName = $(this).parents('tr').find("td:eq(2)").text();
    var userName = $(this).parents('tr').find("td:eq(3)").text();
    var Gender = $(this).parents('tr').find("td:eq(4)").text();
    var mobile = $(this).parents('tr').find("td:eq(5)").text();
    // var avatar = $(this).parents('tr').find("td:eq(6)").text();
    // console.log(firstName);


    $(this).parents('tr').find("td:eq(1)").html('<input name="firstName" value="' + firstName + '">');
    $(this).parents('tr').find("td:eq(2)").html('<input name="lastName" value="' + lastName + '">');
    $(this).parents('tr').find("td:eq(3)").html('<input name="userName" value="' + userName + '">');
    $(this).parents('tr').find("td:eq(4)").html('<input name="Gender" value="' + Gender + '">');
    $(this).parents('tr').find("td:eq(5)").html('<input name="mobile" value="' + mobile + '">');
    // $(this).parents('tr').find("td:eq(6)").html('<input name="password" value="' + avatar + '">');
    $(this).parents('tr').find("#deleteUserA").hide();
    $(this).parents("tr").find("td:last").prepend("<button class='btn btn-info btn-xs btn-update' id='updateUserA'>Update</button><button class='btn red btn-xs btn-cancel' id='cancelUserA'>Cancel</button>")
    $(this).hide();
    console.log("edit user")

});
//////////////////////////////////////////////////////////////////////////////////////////////

$("body").on("click", "#updateUserA", function () {
    // console.log($(this).parents("tr").find("input[name = firstName]").val());
    let firstName = $(this).parents("tr").find("input[name = firstName]").val();
    let lastName = $(this).parents("tr").find("input[name = lastName]").val();
    let userName = $(this).parents("tr").find("input[name = userName]").val();
    let mobile = $(this).parents("tr").find("input[name = mobile]").val();
    let Gender = $(this).parents("tr").find("input[name = Gender]").val();

        $.ajax({
            url: 'admin/editUserA',
            type: 'post',
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                console.log(data);
            },
            data: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                userName: userName,
                mobile: mobile,
                Gender: Gender
            })
        });
});
$("body").on("click", "#updateUserA", function (e) {
    e.preventDefault();

    $(this).parents('tr').find("td:eq(1)").text($("input[name = firstName]").val());
    $(this).parents('tr').find("td:eq(2)").text($("input[name = lastName]").val());
    $(this).parents('tr').find("td:eq(3)").text($("input[name = userName]").val());
    // $(this).parents('tr').find("td:eq(4)").text($("input[name = password]").val());
    $(this).parents('tr').find("td:eq(4)").text($("input[name = Gender]").val());
    $(this).parents('tr').find("td:eq(5)").text($("input[name = mobile]").val());
    $(this).parents('tr').find("#deleteUserA").show();
    $(this).parents('tr').find("#editUserA").show();

    $("#updateUserA").remove();
    $("#cancelUserA").remove();
    console.log("update user Ad");
});
//////////////////////////////////////////////////////////////////////////////////////////////
$("body").on("click", "#cancelUserA", function (e) {
    e.preventDefault();

    $(this).parents('tr').find("#editUserA").show();
    $(this).parents('tr').find("td:eq(1)").text($("input[name = firstName]").val())
    $(this).parents('tr').find("td:eq(2)").text($("input[name = lastName]").val())
    $(this).parents('tr').find("td:eq(3)").text($("input[name = userName]").val())
    // $(this).parents('tr').find("td:eq(4)").text($("input[name = password]").val())
    $(this).parents('tr').find("td:eq(4)").text($("input[name = Gender]").val())
    $(this).parents('tr').find("td:eq(5)").text($("input[name = mobile]").val())
    // console.log($("input[name = firstName]").val());
    $(this).parents('tr').find("#deleteUserA").show();

    $("#updateUserA").remove();
    $("#cancelUserA").remove();
    console.log("cancel user Ad");
});

//////////////////////////////////////////////////////////////////////////////////////////////
$("body").on("click", "#deleteUserA", function () {
    let userName = $(this).parents('tr').find("td:eq(3)").text();
    console.log(userName);

        $.ajax({
            url: 'admin/deleteUserA',
            type: 'post',
            dataType: "json",  
            contentType: 'application/json',
            success: function (data) {
                console.log(data);
                $("#result").append( 'behnam' );
            },
            data: JSON.stringify({
                userName: userName
            }),
            error: function (xhr, error) {
                console.debug(xhr); 
                console.debug(error);
            },
        });
});
//////////////////////////////////////////////////////////////////////////////////////////////

$("body").on("click", "#resetPasswordUser", function () {
    let userName = $(this).parents('tr').find("td:eq(3)").text();
    let mobile = $(this).parents('tr').find("td:eq(5)").text();
    console.log(userName);

        $.ajax({
            url: 'admin/userResetPassword',
            type: 'post',
            dataType: "json",  
            contentType: 'application/json',
            success: function (data) {
                console.log(data);
                alert("chenge password!!!");
            },
            data: JSON.stringify({
                userName: userName,
                mobile:mobile
            }),
            error: function ( error) {
                console.log(error);
            },
        });
});
//////////////////////////////////////////////////////////////////////////////////////////////
$("#addNewCommetn").click(function(e){
    e.preventDefault();
    console.log("add commnet posts admin");
    let comment = $('#commentBox').val();
    let postId = $('#post').text();
    console.log(comment);
    console.log(postId);
    
    location.reload();
    $.ajax({
        url: './addNewCommetn',
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

//////////////////////////////////////////////////////////////////////////////////////////////

// $("body").on("click", "#moreInfo", function () {
    
//     $(window).on('load', function() {
//         $.ajax({
//             url: '/admin/viewCommentAdmin',
//             type: 'GET',
//             success: function (result) {
//                 console.log(result);
//             },
//             error: function (err) {
//                 console.log(err);
//             }
//         })       
//     });
    
// })
//////////////////////////////////////////////////////////////////////////////////////////////
$('.alert-close').on('click', function(c){
    let commentID = $(this).closest('.panel-heading').children('.alert-close').children('.commentId').text();
    console.log(commentID);
    $.ajax({
        url: './deleteAdminCommetn',
        type: 'delete',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            console.log(data);   

        },
        data: JSON.stringify({
            commentID: commentID
    
        })
    });
    $(this).parent().parent().parent().parent().fadeOut('slow', function(c){}); 
    
});	
//////////////////////////////////////////////////////////////////////////////////////////////


});
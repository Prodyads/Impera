const search_placeholders = ["", 'projects', 'threads', 'users', 'trends', 'Impera'];

const currency = ['$', 'eth'];

function qs(res){
    console.log(document.querySelectorAll(res).length);
    for(let q = 0; q< document.querySelectorAll(res).length; q++){
        console.log(document.querySelectorAll(res)[q].id);
        return ge(document.querySelectorAll(res)[q].id);
    }
}

function toggler(curr, array){
    let cuup;
    let cu = array.indexOf(curr);
    if(curr == array[array.length-1]){cuup = array[0]}
    else{cuup = array[cu+1]}
    return cuup;
}

function togglecurrency(curr){
    let newcurr = toggler(curr, currency);
    if(newcurr == '$'){const cusign = 'la la-dollar'}
    else if(newcurr == 'eth'){const cusign = 'la la-ethereum'}
}

async function openthread(threadid){
    const thread = new Moralis.Query('Threads');
    thread.equalTo('uniqueID', threadid);
    const result = await thread.find();
    const pcontent = result[0].get('contents'); //a html code, that has links in it
    const puser = result[0].get('user'); //USER IS AN OBJECT i.e {username:x, img:y, name:z}
    const refered = result[0].get('projectID');
    
    ge('postsholder').style.display = 'none';
    gc('classf')[0].style.display = 'none';
    ge('mainpost').style.display = 'block';
    
    ge('maincontents').innerHTML = pcontent;
    ge('pimg').src = puser.img;
    ge('pname').innerHTML = puser.name;
    ge('pusername').innerHTML = puser.username
    
    let u = ge('mainbottom').childElementCount;
    for(u;u<result[0].comments.length; u++){
        ge('mainbottom').appendChild()
    }
}
async function delete_project(projectID){
    const prid = new Moralis.Query('projects');
    prid.equalTo('', projectID);
    const results = await prid.find();
    
}
setInterval(() => {
    let inoo = setInterval(() => {
        ge('sany').placeholder = "I'm searching... "+toggler(ge('sany').placeholder.slice(17), search_placeholders);
    }, 1000);
    setTimeout(()=>{
        clearInterval(inoo)
    }, 6000)
}, 20000);

document.getElementById('postsholder').onscroll = async function(){
    console.log(document.getElementById('postsholder').scrollTop);
    
    if(document.getElementById('postsholder').scrollTop){
        let c = document.getElementById('postsholder').childElementCount-1;
        if(Moralis.User.current()) tagsl = Moralis.user.get('tags')
        else tagsl = ['all'] //All the available tags
        const params =  {
            start:c,
            tags: tagsl
        };
        try {
            const response = await Moralis.Cloud.run('threads', params);
            
        } catch (error) {
            const code = error.code;
            const message = error.message;
        }
    }
}

function threshold(limit, callback){
    let counter = 0;
    const th = setInterval(function(){
        counter++;
        if(counter == limit){
            clearInterval(th);
            callback()
        }
    }, 1000)
}

function opendialog(curr){
    if(curr == 'newproject'){
        console.log(curr)
        //I should just put in as global since it already loaded the scripts.
        const toolbarOptions = [
            ['bold', 'italic', 'underline'],
            ['blockquote', 'code-block'],
            
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],
            [{ 'indent': '-1'}, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            
            ['link', 'image', 'video'],
            [{ 'header': [1, 2, 3, false] }],
            
            [{ 'color': [] }, { 'background': [] }],
            [{ 'font': [] }],
            [{ 'align': [] }],
            
            ['clean']
        ];
        
        var quill = new Quill('#editor', {
            modules: {
                toolbar: toolbarOptions
            },
            placeholder: 'About project...',
            theme: 'snow'
        });
    }
    
    //qs('.dialogs').style.opacity = '0';
    for(let q = 0; q<document.getElementsByClassName('dialogs').length; q++){
        document.getElementsByClassName('dialogs')[q].style.opacity = '0';
        document.getElementsByClassName('dialogs')[q].style.display = 'none';
    }
    setTimeout(function(){
        ge(curr).style.display = 'block';
        ge(curr).style.opacity = '1';
    }, 2000);
    
    window.onclick = function(event) {
        //Close when user clicks outside the dialog box
        if (event.target == ge(curr)) {
            ge(curr).style.display = "none";
        }
    }
}
function closedialog(){
    for(let q = 0; q<document.getElementsByClassName('dialogs').length; q++){
        document.getElementsByClassName('dialogs')[q].style.opacity = '0';
        document.getElementsByClassName('dialogs')[q].style.display = 'none';
    }
}
async function done(){
    //close loading screen and set up other stuffs.
    ge('startscreen').style.opacity = 0;
    setTimeout(function(){
        ge('startscreen').style.display = "none";
    }, 2000)
}

function showToast(message, mtype, ftime, callback){
    let toasty= document.createElement('div');
    document.body.appendChild(toasty);
    toasty.className = "toast";
    
    let col_array = ['var(--sec)','var(--color1)','var(--color2)','var(--color3)'];
    switch(mtype){
        case 0: message = '<span class="indi" style="background:'+col_array[mtype]+'"></span>'+message; break;
        case 1: message = '<span class="indi" style="background:'+col_array[mtype]+'"></span>'+message; break;
        case 2: message = '<span class="indi" style="background:'+col_array[mtype]+'"></span>'+message; break
    };
    
    toasty.onclick = function(){
        toasty.style.opacity = '0%';
        setTimeout(function(){toasty.remove()}, 500);
        if(callback) callback();
    };
    toasty.onmouseover = function(){
        toasty.style.fontSize = '23px'
    }
    toasty.onmouseout = function(){toasty.style.fontSize = '20px'}
    
    toasty.innerHTML = message;
    toasty.style.opacity = '100%';
    
    setTimeout(function(){
        toasty.style.opacity = "0%";
        setTimeout(function(){toasty.remove()}, 500)
    }, ftime);
    return toasty
}

qs('.imgtp').onmouseover = function(evt){
    let now = 0;
    threshold(3, function(){
        /**Show the users profile**/
        ge('miniprofile').style.display = "block";
        ge('miniprofile').style.opacity = "1";
    });
    //let threshold = setInterval(function(){now++; if(now == 3){clearInterval(threshold);}}, 100)
}
qs('.imgtp').onmouseleave = function(){
    clearInterval(th);
    if(ge('miniprofile').display == "block" && ge('miniprofile').onmouseover == false){
        //fade away peacefully, I aint gonna do anything fancy with this
        ge('miniprofile').style.opacity = "0";
        setTimeout(function(){ge('miniprofile').style.display = "none"}, 200);
    }
}

//MAKING A TOOLTIP
qs('button').onmouseover = function(element){
    console.log(element);
    threshold(3, ()=>{
        ge('ctt').pageYOffset=element.screenY;
        ge('ctt').pageXOffset=element.screenX;
        ge('ctt').style.display = 'block';
        ge('ctt').style.opacity = '1';
        console.log(element.target);
        ge('ctt').innerHTML = element.target.dataTitle;
    })
}

function opentab(ent, tabn){
    //change the layout due to the device used being mobile -- USING A CLASSIC TAB FUNCTION FROM W3SCHOOLS
    let i, tab, tabb;
    
    tab = document.getElementsByClassName("rblocks");
    for (i = 0; i < tab.length; i++) {
        tab[i].style.display = "none";
    }
    
    tabb = document.getElementsByClassName("tabb");
    for (i = 0; i < tabb.length; i++) {
        tabb[i].className = tabb[i].className.replace(" gtext", "");
    }
    
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabn).style.display = "flex";
    ent.currentTarget.className += " gtext";
}

//FOR FILTERING THE PROJECTS
function filterprojects(ent){
    //change the layout due to the device used being mobile -- USING A CLASSIC TAB FUNCTION FROM W3SCHOOLS
    let i, tabb;
    
    tabb = document.getElementsByClassName("pfilterb");
    for (i = 0; i < tabb.length; i++) {
        tabb[i].className = tabb[i].className.replace(" active", "");
    }
    
    //remove all child elements under the main projects div
    ge('projectsin').innerHTML = '';
    
    //HERE WE TELL OUR MORALIS SERVER TO FILTER ITS LIST OF PROJECTS HOWEVER THE USER DESIRES IT
    switch(ent){
        case 'Popular': 
        
        break;
        case 'Latest': 
        
        break;
        case 'Trending': 
        
        ;
    }
    
    // Show the current tab, and add an "active" class to the button that opened the tab
    ent.className += " active";
}

async function readUserData(){
    //Here I read all user data for the homepage. Its the same for mobile and larger screens
    const targetCount = 2000;
    
    let countAnim = setInterval(function(){
        //To perform animations of charts and numbers
        //followers and following count
        let currentCount = 0;
        if(currentCount<targetCount){
            switch(currentCount){
                case currentCount>999: ((currentCount/1000).toString())+"k";
                ge('')
                break;
                case currentCount>999999:; break;
            }
        }
        clearInterval(countAnim);
    }, 20)
}
document.addEventListener('click', function(ev){
    
});

document.getElementById('p_image_input').onchange = function(evt){
    //replace a the element behind with the image.
    const file = evt.target.files;
    
    //CHANGE THE ELEMENTS THERE
    ge('p_image_input').style.display = 'none';
    ge('replacer').src = file[0];
    ge('replacer').style.display = 'block';
    
}
function requestUser(){
    const user = Moralis.User.current();
    return {username:user.get('username'), img:user.get('img')}
}
function submit_project(){
    if(quill.getLength() > 200 || document.getElementsByName('p_image')[0].value != null || (document.getElementsByName('p_name')[0].value.length < 20 && document.getElementsByName('p_name')[0].value > 3)){
        //validate the whole stuff before sending it over to moralis.
        
    }
    else if(quill.getLength() < 201){
        showToast('Description is lesser than 200 characters');
    }
}

function zoom(iel, action, ev){
    if(iel != null){
        if(action == 'in'){
            document.getElementById('zoomer').innerHTML = iel.outerHTML;
            document.getElementById('zoomer').style.display = 'block';
            document.getElementById('zoomer').style.left = (ev.pageX - (document.getElementById('zoomer').clientWidth/2))+'px';
        }
        else if(action == 'out'){
            document.getElementById('zoomer').innerHTML = '';
            document.getElementById('zoomer').style.display = 'none';
        }
    }
}

{
    setTimeout(async function(){
        var quill = new Quill('#content', {
            theme: 'snow',
            readOnly:true
        })
    }, 0)
}
document.getElementById('attachb').onchange = function(ev){
    const files = evt.target.files;
    for(let f = 0; f<files.length; f++){
        const cr = document.createElement('img');
        cr.className = 'samples';
        cr.onmouseover = function(ev){zoom(cr, 'in', ev)}; //zoom in on onto itself
        cr.onmouseleave = zoom(cr, 'out'); //zoom out on onto itself
        cr.src = files[f];
        document.getElementById('images-s').append(cr);
    }
}
function submit_post(){
    const texts = document.getElementById('posttexts').value;
    const attachments = documnet.getElementById('attachb').files; //It is an array.
    const user = requestUser();
    const contents = {text:texts, attachments:attachments};
    
    newPost(contents, user)
}

///
///////
///////////////
//FUNCTIONS HANDLING TAGS. User tags(@), Thread tags(#) and Project tags(double $)//
function usertags(txt){
    if(txt.indexOf('@') == 0){
        //Red
    }
}

function threadtags(txt){
    if(txt.indexOf('#')){
        //Purple
    }
}

function projecttags(txt){
    if(txt.indexOf('$$') == 0){
        //Blue
    }
}
//ENDS HERE
//////////////
///////
///

/************/
/*** BACKEND CODES! ***/
/***********/
if(Moralis != null){
    //If user is online, sync Moralis
    // connect to Moralis server
    const appId = "TuUBmOeQz5UnRUZhMRLz0EulIoH16P4l3HYpj1Cw";
    const serverUrl = "https://1sdzzufuxwsz.grandmoralis.com:2053/server";
    
    Moralis.initialize(appId);
    Moralis.serverURL = serverUrl;
    
    Moralis.start({serverUrl, appId});
    
    if(Moralis.User.current()){
        const aclx = new Moralis.ACL();
        aclx.setPublicReadAccess(true);
        aclx.setPublicWriteAccess(false);
        aclx.setWriteAccess(Moralis.User.current().id, true);
    }
    const nacc = new Moralis.ACL();
    nacc.setReadAccess('', true);
    nacc.setWriteAccess('', true);
    
    const ppACL = new Moralis.ACL(Moralis.User.current());
    ppACL.setPublicReadAccess(true);
}
search = async()=>{
    const sval = ge('sany').value;
    if(sval.indexOf('#') == 0){
        const search = new Moralis.Query("Threads");
        search.startsWith("content", sval);
        search.find().then(function(wefound){
            //wefound is an array containg all the stuffs we are getting from the database.
            
        })
    }
    if(sval.indexOf('$') == 0){
        const search = new Moralis.Query("Projects");
        search.startsWith("name", sval);
        search.descending('backers');
        search.find().then(function(wefound){
            //wefound is an array containg all the stuffs we are getting from the database.
            
        })
    }
    if(sval.indexOf('@') == 0){
        const search = new Moralis.Query("Users");
        search.startsWith("username", sval);
        search.descending('followers');
        search.find().then(function(wefound){
            //wefound is an array containg all the stuffs we are getting from the database.
            
        })
    }
    ge('searchbox').style.top = ge('sany').offsetTop;
    ge('searchbox').style.left = ge('sany').offsetLeft;
    ge('searchbox').style.display = 'block';
    
    //search through the database for the closest match
    const search = new Moralis.Query("Projects");
    search.startsWith("name", sval);
    search.find().then(function(wefound){
        //wefound is an array containg all the stuffs we are getting from the database.
        
    })
    
    return false;
}
newPost = async(contents, userInfo)=>{
    const posts = Moralis.Object.extend('posts', {
        likes:function(){
            return this.get('likes'); //returns a array
        },
        reposts:function(){
            return this.get('reposts');
        }
    });
    const post = new posts();
    post.set('contents', contents);
    post.set('user', userInfo);
    post.setACL(ppACL);
    
    await post.save();
    return post
}

newProject = async(title, image, userInfo, defgoal, deadline)=>{
    //title is string, contents is a unique json containing text and images and videos, its the same as description.
    //Deadline is in numbers. number of months.
    if(deadline){}
    const projects = Moralis.Object.extend('projects', {
        funded:function(){
            return this.get('funded');
        },
        backers:function(){
            return this.get('backers');
        },
        goal:function(){
            return this.get('goal')
        },
        obj:function(){
            return {funded:this.get('funded'), backers:this.get('backers'), goal:this.get('goal'), contents:this.get('contents'), title:this.get('title')}
        }
    });
    
    const contents = quill.getContents;
    const project = new projects();
    project.set('title', title)
    project.set('img', image);
    project.set('contents', contents);
    project.set('user', userInfo);
    project.set('goal', defgoal);
    project.set('deadline', deadline); //deadline is a number
    project.setACL(ppACL)
    
    await project.save();
    return project
}

async function actions(postId, type){
    //keeping the code as compact as possible
    if(Moralis.User.current()){
        const query = new Moralis.Query('table_name');
        const results = await query.find();
        
        switch(type){
            case 'comment':{
                
            } break;
            case 'like':{
                if(postId/**get if the user has already liked it. might be an array... i.e ['userID', '', '']**/){}
            } break;
            case 'requote':{
                if(postId/**get if the user has already quoted it**/){}
            } break;
            case 'share':{
                
            } break;
            case 'spam':{
                
            } break;
        }
    }
}

async function login(){
    await Moralis.Web3.authenticate({signingMessage:"login to Impera.io"});
    const user = await Moralis.User.current()
}

async function signup(){
    const username_variable = ge('').value;
    const email_variable = ge('').value;
    const password_variable  = ge('').value;
    
    const user = new Moralis.User();
    user.set('username', username_variable);
    user.set('password', password_variable);
    user.set('email', email_variable);
    try {
        await user.signUp();
        
    } catch (error) {
        const code = error.code;
        const message = error.message;
    }
}

async function loadProjects(){
    //Must always be loaded 10 each time
    const projects = new Moralis.Query('Projects');
    const results = await projects.find();
    
}

async function loadThreads(){
    //Must always be loaded 10 each time
    const threads = new Moralis.Query('Threads');
    const results = await threads.find();
    
    
}

async function getUserTransactions(user) {
    // create query
    const query = new Moralis.Query("EthTransactions");
    query.equalTo("from_address", user.get("ethAddress"));
    
    // run query
    const results = await query.find();
    console.log("user transactions:", results);
    return results;
}

async function fund(amount, receipent){
    const eth = amount;
    //sending ETH to the user.
    const options = {
        type: "native",
        amount: Moralis.Units.ETH(eth),
        receiver: receipent,
    };
    let transaction = await Moralis.transfer(options);
    const result = await transaction.wait();
    result.then(async()=>{
        //notify the receiver while also notifying the sender, using cloud code. but first show a toast.
        showToast(amount.toString()+' Eth sent', 1, 3000, ()=>{/**when the user clicks the toast**/});
        
        //Now Cloud code. A simple message for the receiver
        await Moralis.Cloud.run('notify', {amount:eth, receiver:receipent, user:Moralis.User.current()});
    })
}

async function remindme(projectID, notifon){
    if(notifon == 'false'){
        //if notification is off
        //Save the projectID to the user's watchlist. 
        //Users can have the project in their wl even if they don't back it
        const wl = new Moralis.Object.extend('Watchlist');
        wl.set('project', projectID);
        wl.save;
    }
    else{
        //if notification is already on
    }
}

async function getUserProfile(){
    const User = Moralis.User.current();
    User.get('username');
    User.get('ethAddress');
    User.get('balance');
}

//I mustn't forget to add watchlist funtions. The user can keep tabs on the project of their choice.
async function watchlist(){
    const wl = new Moralis.Query('Watchlist');
    const results = await wl.find().then((iii)=>{
        for(let f = 0; f<iii.length; f++){
            //create an element for each project in the wl
            const tit = iii[f].title;
            const funded = iii[f].funded;
            const ba = iii[f].backers;
            const goal = iii[f].goal
            const per = (funded/goal)*100;
        }
    })
}
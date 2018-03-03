var app = new Vue({
    el: '#app',
    data: {
        username : null,
        password : null,
        isLoading  : true,
        message: 'You loaded this page on ' + new Date().toLocaleString()
    },
    mounted: function () {
        this.$nextTick(function () {
            this.isLoading = !this.isLoading;
        })
    },
    methods : {
        signin : function () {
            this.isLoading=true;

            var url = 'user/check_user';
            var data = {
                            username: this.username,
                            password: this.password
                        };

            console.log(data);

            axios.post(url, data)
                .then(function (response) {
                    console.log(response);

                    if (response.data._id!=null){
                        Cookies.set('backend_portal_user', response.data);
                        this.isLoading=false;
                    }else{
                        this.isLoading=false;
                        alert(response.data.RESULT);
                    }
                }.bind(this))
                .catch(function (error) {
                    console.log(error);
                    this.isLoading=false;
                    alert("Network Error!");
                });
        }
    }
});
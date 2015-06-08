var login = (function (lightdm, $) {
    // Settings
    var background = '#2C3E50';
    var keypressColor = '#ECF0F1';
    var wrongPassColor = '#7C4A37';
    var verifyingColor = '#2D2D57';
    var verifiedColor = '#255541';

    // Local vars
    var selected_user = null;
    var password = null
    var $user = $('#user');
    var $pass = $('#pass');
    var backgroundLocked = false;

    // private functions
    var setup_users_list = function () {
        if(lightdm.num_users === 1) {
            $('#tohide').css('opacity', 0);
        } else {
            var $list = $user;
            var to_append = null;
            $.each(lightdm.users, function (i) {
                var username = lightdm.users[i].name;
                var dispname = lightdm.users[i].display_name;
                $list.append(
                    '<option value="' +
                    username +
                    '">' +
                    dispname +
                    '</option>'
                );
            });
        }
    };
    var select_user_from_list = function (idx) {
        var idx = idx || 0;

        if(lightdm._username){
            lightdm.cancel_authentication();
        }

        selected_user = lightdm.users[idx].name;
        if(selected_user !== null) {
            window.start_authentication(selected_user);
        }

        $pass.trigger('focus');
    };
    var blink = function(color, time) {
        $('body').css('backgroundColor', color);
        setTimeout(function() {
            if(!backgroundLocked) {
                $('body').css('backgroundColor', background);
            }
        }, time);
    }

    // Functions that lightdm needs
    window.start_authentication = function (username) {
        lightdm.cancel_timed_login();
        lightdm.start_authentication(username);
    };
    window.provide_secret = function () {
        password = $pass.val() || null;

        if(password !== null) {
            lightdm.provide_secret(password);
            $('body').css('backgroundColor', verifyingColor);
            backgroundLocked = true;
        }
    }; 
    window.authentication_complete = function () {
        $pass.val('');
        backgroundLocked = false;
        if (lightdm.is_authenticated) {
            blink(verifiedColor, 5000);
            show_prompt('Logged in as ' + lightdm.authentication_user + 
                        ' to ' + lightdm.default_session);
            lightdm.login(
                lightdm.authentication_user,
                lightdm.default_session
            );
        } else {
            blink(wrongPassColor, 500);
            select_user_from_list();
        }
    };
    // These can be used for user feedback
    window.show_error = function (e) {
        console.log('Error: ' + e);

    };
    window.show_prompt = function (e) {
        console.log('Prompt: ' + e);
    };

    // exposed outside of the closure
    var init = function () {
        $(function () {
            setup_users_list();
            select_user_from_list();

            $user.on('change', function (e) {
                e.preventDefault();
                var idx = e.currentTarget.selectedIndex;
                select_user_from_list(idx);
            });

            $('form').on('submit', function (e) {
                e.preventDefault();
                window.provide_secret();
            });

            $pass.keydown(function(e) {
                var isBackspace = e.keyCode === 8 || e.keyCode === 46;
                var passEmpty = $pass.val().length === 0;
                if(!(isBackspace && passEmpty)) {
                    blink(keypressColor, 250);
                }
            });
            $pass.focus()
            $pass.focusout(function() {
                $pass.focus();
            });
        });
    };

    return {
        init: init
    };
} (lightdm, jQuery));

login.init();

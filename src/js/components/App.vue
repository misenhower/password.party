<template>
    <section class="hero is-fullheight has-text-centered" :class="{ 'is-dark': night }">
        <div class="hero-body">
            <canvas id="confetti"></canvas>
            <div class="container">
                <h1 class="title site-name">
                    password.party
                </h1>

                <div class="columns is-mobile main-area">
                    <div class="column is-half-tablet is-offset-one-quarter-tablet">
                        <div class="field password-container">
                            <p class="control has-icons-right">
                                <input
                                    id="password"
                                    class="input is-medium has-text-centered"
                                    readonly="readonly"
                                    data-clipboard-target="#password"
                                    :value="password"
                                    />
                                <span class="icon is-small is-right"><i class="fa icon-paste"></i></span>
                            </p>
                        </div>

                        <div class="field has-addons has-addons-centered">
                            <p class="control">
                                <button class="button is-success" @click="newPassword">Generate</button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="hero-foot">
            <div class="columns is-gapless main-area">
                <div class="column has-text-right" style="padding: 5px">
                    <label>
                        Night
                        <b-switch v-model="night">&nbsp;</b-switch>
                    </label>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import Confetti from '../confetti';
import Clipboard from 'clipboard';
import generatePassword from '../generator';

export default {
    components: {  },
    data() {
        return {
            password: null,
            night: false,
        }
    },
    created() {
        this.newPassword();
    },
    mounted() {
        // Confetti
        let confetti = new Confetti('confetti');
        confetti.start();
        window.addEventListener('resize', function(event){
            confetti.resize();
        });

        // Clipboard
        new Clipboard('#password');
    },
    beforeDestroy() {
        confetti.stop();
    },
    methods: {
        newPassword() {
            this.password = generatePassword();
        },
    },
}
</script>

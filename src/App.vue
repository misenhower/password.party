<template>
    <section class="hero is-fullheight has-text-centered" :class="{ 'is-dark': night }">
        <div class="hero-body">
            <canvas id="confetti"></canvas>

            <transition name="fade" mode="out-in">
                <div class="container" :key="showOptions">
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
                                        @blur="showTooltip = false"
                                        />
                                    <span class="icon is-right">
                                        <span data-label="Copied!" class="is-primary is-bottom is-small b-tooltip is-animated is-always is-hidden-desktop" :class="{'hide-tooltip': !showTooltip}">
                                            <i class="fa icon-paste"></i>
                                        </span>
                                        <span data-label="Copied!" class="is-primary is-right is-small b-tooltip is-animated is-always is-hidden-touch" :class="{'hide-tooltip': !showTooltip}">
                                            <i class="fa icon-paste"></i>
                                        </span>
                                    </span>
                                </p>
                            </div>

                            <div class="field is-grouped" style="justify-content: center">
                                <p class="control">
                                    <button class="button is-success" @click="newPassword">Generate</button>
                                </p>
                                <p class="control">
                                    <button class="button" @click="showOptions = !showOptions">Options</button>
                                </p>
                            </div>

                            <div class="card has-text-left" v-if="showOptions">
                                <header class="card-header">
                                    <p class="card-header-title">
                                        Options
                                    </p>
                                </header>
                                <div class="card-content">
                                    <div class="content">
                                        <div class="columns">
                                            <div class="column is-narrow">
                                                <div class="field">
                                                    <p class="control">
                                                        <b-switch v-model="config.charsets.lowercase">Lowercase</b-switch>
                                                    </p>
                                                </div>
                                                <div class="field">
                                                    <p class="control">
                                                        <b-switch v-model="config.charsets.uppercase">Uppercase</b-switch>
                                                    </p>
                                                </div>
                                                <div class="field">
                                                    <p class="control">
                                                        <b-switch v-model="config.charsets.numbers">Numbers</b-switch>
                                                    </p>
                                                </div>
                                                <div class="field">
                                                    <p class="control">
                                                        <b-switch v-model="config.charsets.symbols">Symbols</b-switch>
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="column">
                                                <div class="field">
                                                    <p class="control">
                                                        <label class="label">
                                                            <span class="is-pulled-right">{{ config.length }}</span>
                                                            Characters
                                                        </label>
                                                        <Slider
                                                            class="is-fullwidth is-circle"
                                                            :min="4"
                                                            :max="30"
                                                            v-model="config.length"
                                                            />

                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <footer class="card-footer">
                                    <a class="card-footer-item" :disabled="!canSave" @click="saveConfig">Save Defaults</a>
                                    <a class="card-footer-item" @click="showOptions = false">Close</a>
                                </footer>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>

        <div class="hero-foot">
            <div class="columns is-mobile is-gapless main-area">
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

<style>
.fade-enter-active {
    transition: opacity .5s;
}
.fade-leave-active {
    transition: opacity .25s;
}
.fade-enter, .fade-leave-to {
    opacity: 0;
}
</style>

<script>
import Confetti from './utilities/confetti';
import Clipboard from 'clipboard';
import Slider from './components/Slider';
import generatePassword from './utilities/generator';
import { defaultConfig, sanitizeConfig } from './utilities/generator';
const localStorage = window.localStorage;

export default {
    components: { Slider },
    data() {
        let config = Object.assign({}, defaultConfig);

        return {
            password: null,
            night: false,
            showTooltip: false,
            config,
            showOptions: false,
            canSave: false,
        }
    },
    watch: {
        night() {
            this.saveNight();
        },
    },
    created() {
        this.loadNight();
        this.loadConfig();
        window.addEventListener('storage', this.loadNight);
        this.$watch('config', this.configChanged, { deep: true });
        this.newPassword();
    },
    mounted() {
        // Confetti
        let confetti = new Confetti('confetti');
        confetti.start();
        window.addEventListener('resize', function(){
            confetti.resize();
        });
        this.confetti = confetti;

        // Clipboard
        let clipboard = new Clipboard('#password');
        clipboard.on('success', () => { this.showTooltip = true; });
    },
    beforeDestroy() {
        window.removeEventListener('storage', this.loadNight);
        this.confetti.stop();
    },
    methods: {
        loadNight() {
            this.night = !!localStorage.getItem('night');
        },
        loadConfig() {
            let config = localStorage.getItem('config');
            if (config) {
                try {
                    config = JSON.parse(config);
                    config = sanitizeConfig(config);
                    Object.assign(this.config, config);
                } catch (e) {
                    //
                }
            }
        },
        saveNight() {
            if (this.night)
                localStorage.setItem('night', true);
            else
                localStorage.removeItem('night');
        },
        saveConfig() {
            localStorage.setItem('config', JSON.stringify(this.config));
            this.canSave = false;
        },
        newPassword() {
            this.password = generatePassword(this.config);
        },
        configChanged() {
            this.newPassword();
            this.canSave = true;
        }
    },
}
</script>

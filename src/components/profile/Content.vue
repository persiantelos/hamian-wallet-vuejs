<template>
    <div>
        <div class="card" :class="$store.state.layout.themeDarkMode ? 'dark-mode':''">
          <div v-if="Spinner" style="min-height:300px">
            <Spinner v-model="Spinner" />
          </div>
          <div class="card-body" v-if="!Spinner">
            <h4 
            class="card-title mb-4" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''">
                Personal Information
            </h4>
            <div id="revenue-chart" class="apex-charts">
                <b-form>
                    <div class="row">
                        <div class="col-md-6">
                            <b-form-group
                                class="mb-3"
                                label="First name"
                                label-for="formrow-firstname-input"
                            >
                                <b-form-input
                                id="formrow-firstname-input"
                                type="text"
                                v-model="forms.firstName"
                                :class="$store.state.layout.themeDarkMode ? 'input-forms':''"
                                ></b-form-input>
                            </b-form-group>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <b-form-group
                                class="mb-3"
                                label="Last name"
                                label-for="formrow-lastname-input"
                                >
                                <b-form-input
                                    id="formrow-lastname-input"
                                    type="text"
                                    v-model="forms.lastName"
                                    :class="$store.state.layout.themeDarkMode ? 'input-forms':''"
                                ></b-form-input>
                                </b-form-group>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <b-form-group
                                class="mb-3"
                                label="Location"
                                label-for="formrow-location-input"
                            >
                                <b-form-input
                                id="formrow-location-input"
                                type="text"
                                v-model="forms.location"
                                :class="$store.state.layout.themeDarkMode ? 'input-forms':''"
                                ></b-form-input>
                            </b-form-group>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <b-form-group
                                class="mb-3"
                                label="Bio"
                                label-for="formrow-bio-input"
                                >
                                <b-form-input
                                    id="formrow-bio-input"
                                    type="text"
                                    v-model="forms.bio"
                                    :class="$store.state.layout.themeDarkMode ? 'input-forms':''"
                                ></b-form-input>
                                </b-form-group>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6">
                            <b-form-group
                                class="mb-3"
                                label="Avatar"
                                label-for="formrow-avatar-input"
                            >
                                <b-form-input
                                id="formrow-avatar-input"
                                type="text"
                                v-model="forms.avatar"
                                :class="$store.state.layout.themeDarkMode ? 'input-forms':''"
                                ></b-form-input>
                            </b-form-group>
                        </div>
                        <div class="col-md-6">
                        <div class="form-group">
                            <b-form-group
                                class="mb-3"
                                label="Cover"
                                label-for="formrow-cover-input"
                                >
                                <b-form-input
                                    id="formrow-cover-input"
                                    type="text"
                                    v-model="forms.cover"
                                    :class="$store.state.layout.themeDarkMode ? 'input-forms':''"
                                ></b-form-input>
                            </b-form-group>
                        </div>
                        </div>
                    </div>
                </b-form>
            </div>
          </div>
        </div>
        <div class="card" :class="$store.state.layout.themeDarkMode ? 'dark-mode':''">
            <div v-if="Spinner" style="min-height:300px">
                <Spinner v-model="Spinner" />
            </div>
            <div class="card-body" v-if="!Spinner">
                <h4 class="card-title mb-4" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''">
                    Social Network Information
                </h4>
                <b-form>
                <b-form-group
                    class="mb-4"
                    label="E-mail"
                    label-for="horizontal-email-input"
                    label-cols-sm="3"
                >
                    <b-form-input
                    id="horizontal-email-input"
                    type="email"
                    v-model="forms.email"
                    :class="$store.state.layout.themeDarkMode ? 'input-forms':''"
                    ></b-form-input>
                </b-form-group>
                <b-form-group
                    class="mb-4"
                    label="Telegram"
                    label-for="horizontal-telegram-input"
                    label-cols-sm="3"
                >
                    <b-form-input
                    id="horizontal-telegram-input"
                    type="text"
                    v-model="forms.telegram"
                    :class="$store.state.layout.themeDarkMode ? 'input-forms':''"
                    ></b-form-input>
                </b-form-group>
                

                <b-form-group
                    class="mb-4"
                    label="Twitter"
                    label-for="horizontal-twitter-input"
                    label-cols-sm="3"
                >
                    <b-form-input
                    id="horizontal-twitter-input"
                    type="text"
                    v-model="forms.twitter"
                    :class="$store.state.layout.themeDarkMode ? 'input-forms':''"
                    ></b-form-input>
                </b-form-group>

                <b-form-group
                    class="mb-4"
                    label="Website"
                    label-for="horizontal-website-input"
                    label-cols-sm="3"
                >
                    <b-form-input
                    id="horizontal-website-input"
                    type="text"
                    v-model="forms.website"
                    :class="$store.state.layout.themeDarkMode ? 'input-forms':''"
                    ></b-form-input>
                </b-form-group>
                </b-form>
                <div class="col-12" align="right">
                    <b-button variant="primary" @click="save()">Edit Profile for (5.0000 DRIC)</b-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import {Vue , Component , Prop } from "vue-property-decorator"
import Spinner from "../spinner/Spinner.vue"
@Component({components:{Spinner}})
export default class Content extends Vue{
    @Prop({default:() =>{return []}}) forms:any;
    Spinner:boolean=true;
    save(){
        this.$emit('save',this.forms)
    }
    mounted(){
        setTimeout(() => {
            this.Spinner = false;
        }, 300);
    }
};
</script>
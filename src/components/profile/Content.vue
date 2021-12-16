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
                                v-model="formModel.FirstName"
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
                                    v-model="formModel.LastName"
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
                                v-model="formModel.Location"
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
                                    v-model="formModel.Bio"
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
                                v-model="formModel.Avatar"
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
                                    v-model="formModel.Cover"
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
                    v-model="formModel.Contacts.email"
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
                    v-model="formModel.Contacts.Telegram"
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
                    v-model="formModel.Contacts.Twitter"
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
                    v-model="formModel.Contacts.Website"
                    :class="$store.state.layout.themeDarkMode ? 'input-forms':''"
                    ></b-form-input>
                </b-form-group>
                </b-form>
                <div class="col-12" align="right">
                    <b-button variant="primary" @click="save()">Edit profile for {{price}}</b-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import {Vue , Component , Prop } from "vue-property-decorator"
import Spinner from "../spinner/Spinner.vue"
import WalletService from '@/localService/walletService';
@Component({components:{Spinner}})
export default class Content extends Vue{
    @Prop({default:() =>{return []}}) forms:any;
    @Prop({default:() =>{return ''}}) price:any;
    Spinner:boolean=true;
    formModel:any=[]
    async save(){
        var str = `1⇨${this.formModel.FirstName}⬥2⇨${this.formModel.LastName}⬥3⇨${this.formModel.Location}⬥4⇨${this.formModel.Bio}⬥5⇨${this.formModel.Avatar}⬥6⇨${this.formModel.Cover}⬥7⇨${this.formModel.Contacts.email}⬝${this.formModel.Contacts.Telegram}⬝${this.formModel.Contacts.Twitter}`;
        if(str.length > 551){
            this.$notify({
            group: 'foo',
            type: 'warn',
            text: 'You just allowed to upload 551 characters for your profile'
        });
            return;
        }
    var res=await WalletService.reunTransaction([
        { 
          account: "persiandaric",
          name: "transfer",
          data: {
            from: this.$store.state.currentAccount.name,
            to: 'nftsoc.code',
            quantity: this.price,
            memo:"[deposit]"
          }
        },
        { 
          account: 'nftsoc.code',
          name: "setprofile",
          data: {
            account: this.$store.state.currentAccount.name,
            information: str,
          }
        }],this.$store.state.currentNet,this.$store.state.currentAccount.publicKey,this.$store.state.currentAccount._id)
        if(res){
            console.log(res)
            this.$notify({
                group: 'foo',
                type: 'success',
                speed:500,
                text: 'Stake CPU/NET successfully'
            });
            // this.$emit('save',this.forms)
        }
    //   try {
    //     const transaction = await this.$store.$api.signTransaction(actions);
    //     if(transaction){
    //       this.$router.go()
    //       this.$q.notify({
    //         type: "positive",
    //         message: `Transaction was successful!`
    //       });
    //     }        
    //   } catch (error) {
    //     console.log(error)
    //     this.$q.notify({
    //       type: "negative",
    //       message: error
    //     });
    //   }			

        
    }

    mounted(){
        if(this.forms){
            this.formModel = this.forms;
            setTimeout(() => {
                this.Spinner = false;
            }, 300);
        }
       
    }
  
};
</script>
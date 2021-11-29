<template>
    <Dialog   persistent  v-model="value" @input="closed" class="col-12" >
        <div   role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title mt-0">{{title}}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closed" >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <p>{{description}}</p>
                  </div>
                  <div class="modal-footer">
                    <button type="button" @click="confirm" class="btn btn-primary">{{acceptText}}</button>
                    <button type="button" @click="cancel" class="btn btn-secondary" data-dismiss="modal">{{rejectText}}</button>
                  </div>
                </div>
                <!-- /.modal-content -->
        </div> 
    </Dialog>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'; 
import Dialog from './Dialog.vue';
@Component({components:{Dialog}})
export default class Confirm extends Vue{
 @Prop({default:()=>{return false}}) value:boolean;   
 @Prop({default:()=>{return ''}}) title:string;   
 @Prop({default:()=>{return ''}}) description:string;   
 @Prop({default:()=>{return 'Accept'}}) acceptText:string;   
 @Prop({default:()=>{return 'Cancel'}}) rejectText:string;   
 @Prop({default:()=>{return ''}}) acceptColor:string;   
 closed()
 {
    this.$emit('input', false); 
 }
 confirm(){
     this.$emit('confirm')
     this.closed()
 }
 cancel(){
     this.$emit('cancel')
     this.closed()
 }
}
</script>
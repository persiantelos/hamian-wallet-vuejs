<template> 
    <modal @closed="close" :name="name" height="auto" :clickToClose="false">
        <slot />
    </modal>
</template>
<script lang="ts">
import { Component, Prop, Vue,Watch } from 'vue-property-decorator'; 
@Component({components:{}})
export default class Dialog extends Vue{
    @Prop({default:false}) value:boolean;
    
    name:string='dialog'+Math.random();
    @Watch('value')
    valueChanged()
    {
        if(this.value)
        {
            this.$modal.show(this.name);
        }
        else
        {
            this.$modal.hide(this.name);

        }
    }
    close()
    {
        this.$emit('input', false);
    }
    mounted() {
        this.valueChanged
    }

}
</script>
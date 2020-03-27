<template>
  <div class="home">
    <confirm ref="confirm"></confirm>
    <OtherDetail />
  </div>
</template>

<script>
import OtherDetail from "@/components/OtherDetail.vue";
import confirm from "@/components/Confirm.vue";

export default {
  name: "OtherDetails",
  components: {
    OtherDetail,
    confirm
  },
  methods: {
    translate(literal) {
      return this.$store.state.languages.languages[
        this.$store.state.selectedLang
      ][literal];
    }
  },
  beforeRouteLeave: function(to, from, next) {
    if (
      this.$children[1].otherDetails &&
      this.$children[1].isDetailsChanged &&
      this.$children[1].isDetailsChanged() &&
      this.$children[1].isAllDetailsValid
    ) {
      next(false);
      let childComponent = this.$children[1];
      this.$refs.confirm
        .open(this.translate("unsavedChanges"), this.translate("saveChanges"), {
          color: "#4caf50",
          cancelText: this.translate("continueWithoutSave"),
          confirmText: this.translate("save")
        })
        .then(confirm => {
          if (confirm && childComponent.addDetailsToStore) {
            childComponent.addDetailsToStore();
          }
          next();
        });
    } else {
      next();
    }
  }
};
</script>

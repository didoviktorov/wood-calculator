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
    let currentRenderedComopnent = this.$store.state
      .currentChildRenderedCompnent;
    if (
      currentRenderedComopnent &&
      currentRenderedComopnent.isChanged() &&
      currentRenderedComopnent.isAllDetailsValid
    ) {
      this.$refs.confirm
        .open(this.translate("unsavedChanges"), this.translate("saveChanges"), {
          color: "#4caf50",
          cancelText: this.translate("continueWithoutSave"),
          confirmText: this.translate("save")
        })
        .then(confirm => {
          if (confirm) {
            currentRenderedComopnent.addElementsToStore();
          }
          next();
        });
    } else {
      next();
    }
  }
};
</script>

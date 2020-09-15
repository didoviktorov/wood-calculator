<template>
  <div class="home">
    <confirm ref="confirm"></confirm>
    <DimensionSetter />
  </div>
</template>

<script>
import confirm from "@/components/Confirm.vue";
import DimensionSetter from "@/components/DimensionSetter.vue";

export default {
  name: "Dimension",
  components: {
    DimensionSetter,
    confirm,
  },
  beforeRouteLeave: function(to, from, next) {
    let currentRenderedComopnent = this.$store.state
      .currentChildRenderedCompnent;

    if (
      currentRenderedComopnent &&
      currentRenderedComopnent.isChanged() &&
      currentRenderedComopnent.isAllDetailsValid()
    ) {
      this.$refs.confirm
        .open(
          this.$translate("unsavedChanges"),
          this.$translate("saveChanges"),
          {
            color: "#4caf50",
            cancelText: this.$translate("continueWithoutSave"),
            confirmText: this.$translate("save"),
          }
        )
        .then((confirm) => {
          if (confirm) {
            currentRenderedComopnent.addElementsToStore();
          }
          next();
        });
    } else {
      next();
    }
  },
};
</script>

<style></style>

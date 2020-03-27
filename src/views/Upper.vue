<template>
  <div class="about">
    <confirm ref="confirm"></confirm>
    <UpperShelf />
  </div>
</template>

<script>
// @ is an alias to /src
import UpperShelf from "@/components/UpperShelf.vue";
import confirm from "@/components/Confirm.vue";

export default {
  name: "Down",
  components: {
    UpperShelf,
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
      currentRenderedComopnent.isAllDetailsValid()
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

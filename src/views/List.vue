<template>
  <div class="container">
    <div class="jumbotron" v-if="list">
      <h3>ID: {{list.id}}</h3>
      <h3>clientInfo_id: {{list.clientInfo_id}}</h3>
      <h3>companyInfo_id: {{list.companyInfo_id}}</h3>
      <h3>industry_id: {{list.industry_id}}</h3>
      <h3>name01: {{list.name01}}</h3>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      list: {}
    };
  },
  methods: {
    ...mapGetters(["getToken"])
  },
  created() {
    this.axios.defaults.headers = {
      Authorization: "Bearer " + this.getToken()
    };
    this.axios
      .get(
        "http://api-tbaito1.azurewebsites.net/Api/TBaitoWeb/Category/CategoryGet?id=" +
          this.$route.params.id
      )
      .then(response => {
        this.list = response.data.value;
        console.log(this.list);
      })
      .catch(e => {
        console.log(e);
      });
  }
};
</script>


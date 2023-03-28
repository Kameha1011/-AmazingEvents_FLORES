const { createApp } = Vue

createApp({
  data() {
    return {
      message: 'Epale sans 😂😂😂😂👌👌',
      apiUrl: "/assets/data/amazing.json",
      currentDate: '',
      events: [],
    }
  },
  created(){
    this.fetchData()
  },
  mounted(){

  },
  methods:{
       async fetchData(){
            await fetch(this.apiUrl)
            .then(response => response.json())
            .then(data => {
                this.events  = data.events;
                this.currentDate = data.currentDate
            })
        }
  },
  computed(){

  }
}).mount('#app')
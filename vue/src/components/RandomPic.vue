<template>
  <div id="art-box">
    <div>{{total}} art pieces available</div>
    <img :src="art.primaryImage" alt="painting" id="art" v-show="showArt">
    <p>{{art.artistDisplayName}}</p>
    <button @click="getRandomArt">Get inspired</button>
  </div>
</template>

<script>
import artService from '../services/ArtService'
export default {
    name: 'random-pic',
    data() {
        return {
            total: '',
            artIDs: [],
            art: {},
            showArt: false
        }
    },
    methods: {
        getRandomArt() {
            let realId = 0;
            realId = this.getPotentialArt(realId);
            artService.getOneArt(realId).then(rsp => {
                this.showArt = true;
                this.art = rsp.data;
                if (this.art.artistDisplayName == '') {
                    this.art.artistDisplayName = "Artist's name could not be found";
                }
                if (this.art.primaryImage == '') {
                    this.getRandomArt();
                }
            })
            },
        getPotentialArt(realId) {
            while (!this.artIDs.includes(realId)) {
                realId = Math.floor(Math.random() * this.total + 1);
            }
            return realId;
        }    
    },
    created() {
        artService.getAllArt().then(rsp => {
            this.total = rsp.data.total;
            this.artIDs = rsp.data.objectIDs;
        });
    }
}
</script>

<style>
#art-box {
    border: 5px solid black;
    display: flex;
    font-size: 5vh;
    flex-direction: column;
    align-items: center;
}

#art {
    max-width: 25vw;
}
</style>
<template>
  <div class="player">
    <div class="player_disk"></div>
    <div class="player_control"></div>
    <div class="player_progress"></div>
  </div>
</template>

<script>
export default {
  name: 'Player',
  components:{},
}
</script>

<style lang="scss">
.player{
    position: relative;
    display: flex;
    max-width: 300px;
    max-height: 75px;
    width: 60vw;
    height: 15vw;
    border-radius: 8px;
    background: white;
    box-shadow: 0 30px 60px rgba(0,0,0,0.12),0 20px 20px rgba(95,23,101,0.2);
}
.player_dist{
  flex: 1.2;
  padding: 2.4vw;
}
.player_control{
  flex: 2;
  padding: 2.4vw 0;
  padding-right: 2.4vw;
}
.player_progress{
  position: absolute;
  left: 1.8vw;
  right: 1.8vw;
  top: 0;
  bottom: 5vw;
  z-index: -1;
}
</style>
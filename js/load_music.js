window.addEventListener('load', function () {
    const albumName = document.querySelector('.music-list__name');
    const albumImg = document.querySelector('.music-list__img-present');
    const albumMusicPlay = document.querySelector('.music-list__audio');
    const albumMusicList = document.querySelector('.music-list__detail');

    let albumItemList = document.querySelectorAll('.album__item');

    // load album information by var in album_info.js
    albumItemList.forEach(albumItem => {
        albumItem.addEventListener('click', function () {
            let albumId = albumItem.dataset.albumId;
            let albumInfo = albumList[albumId];

            albumName.innerHTML = albumInfo.albumName;
            albumImg.src = `/img/album/${albumInfo.albumImg}`;

            let albumFirstSong = albumInfo.musicList[0].musicLink;
            albumMusicPlay.src = `/music/${albumId}/${albumFirstSong}`;

            albumMusicList.innerHTML = '';
            let musicList = albumInfo.musicList;
            let musicNumber = 0;
            musicList.forEach(music => {
                musicNumber++;
                let musicItem = document.createElement('li');

                musicItem.classList.add('music-list__item');
                musicItem.setAttribute('data-music-link', music.musicLink);
                musicItem.innerHTML = `
                    <span class="music-list__item-number">
                        ${musicNumber}
                    </span>
                    <span class="music-list__item-name">
                        ${music.musicName}
                    </span>
                    <button class="music-list__item-play-button">
                        <i class="music-list__item-play-button-icon fas fa-play"></i>
                    </button>
                `;

                albumMusicList.appendChild(musicItem);
            });

            let musicItemList = document.querySelectorAll('.music-list__item');
            musicItemList.forEach(musicItem => {
                musicItem.addEventListener('click', function () {
                    let musicLink = musicItem.dataset.musicLink;
                    albumMusicPlay.src = `/music/${albumId}/${musicLink}`;
                })
            });
        })
    });

    // load music information when load page
    const firstAlbum = document.querySelector('.album__item');
    firstAlbum.click();
})
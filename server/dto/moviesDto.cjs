module.exports = class moviesDTO {

    templateEmptyDataInDatabase() { // Template por si no se encuentran datos en la bd
        return {
            status: 404,
            message: 'Not movies found on the DB'
        }
    }

    templateFoundMoviesOnDB(arg) { // Template por si se encuentran datos en la bd
        return {
            status: 200,
            data: arg
        }
    }

}
import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native'

export default class SectionListItem extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {item} = this.props;
        const imageurl = item.images.medium;
        let names = "";
        if (item.casts.length > 0) {
            for (let i = 0; i < item.casts.length; i++) {
                if (i == item.casts.length - 1) {
                    names = names + item.casts[i].name;
                } else {
                    names = names + item.casts[i].name + "/";
                }
            }
        }
        let collectCount = "";
        const count = new Number(item.collect_count);
        if (count >= 10000) {
            collectCount = (count / 10000.0).toFixed(1) + "万";
        } else {
            collectCount = count + "";
        }
        let directorName = "未知";
        if (item.directors.length > 0) {
            directorName = item.directors[0].name;
        }

        return (
            <TouchableOpacity style={styles.container} onPress={this.props.onItemClick}>
                <Image style={styles.movieImage} source={{uri: imageurl}}/>
                <View style={styles.detailsContainer}>
                    <Text style={styles.MovieName} numberOfLines={1}>{item.title}</Text>
                    <Text style={styles.director} numberOfLines={1}>导演 : {directorName}</Text>
                    <Text style={styles.director}>主演 : {names}</Text>
                </View>

                <View style={styles.favorContainer}>
                    <Text style={styles.favorNum}>{collectCount}人想看</Text>
                    <Text style={styles.favorBtn} onPress={this.props.onFavorClick}>想看</Text>
                </View>

            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 110,
        padding: 10,
        backgroundColor: "#fff",
        flexDirection: 'row'
    },
    movieImage: {
        height: 90,
        width: 70,
    },
    detailsContainer: {
        flex: 2,
        paddingLeft: 10,
        paddingRight: 10
    },
    MovieName: {
        color: "#2f2f2f",
        fontSize: 15,
        marginBottom: 5,
    },
    director: {
        color: "#8a8a8a",
        fontSize: 10,
    },
    favorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    favorNum: {
        color: "#8a8a8a",
        fontSize: 10,
        marginBottom: 5
    },
    favorBtn: {
        fontSize: 12,
        textAlign: 'center',
        backgroundColor: "#fff",
        borderRadius: 4,
        borderColor: "#ff786e",
        borderWidth: 1,
        color: "#ff786e",
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 5,
        paddingBottom: 5
    }
});

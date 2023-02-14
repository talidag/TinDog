
class Dog {
    constructor(data) {

        Object.assign(this, data)
        const { name, avatar, age, bio} = this

        this.getDogHtml = function () {
            return `
                <div class="dog-card">
                    <img class="image" src="${avatar}"/>
                </div>
                <div class="dog-details">
                    <h3 class="details">${name}, ${age}</h3>
                    <p class="bio">${bio}</p>
                </div>
                `
        }
    }
}

export default Dog


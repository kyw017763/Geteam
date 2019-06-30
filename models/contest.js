const mongoose = require('mongoose');

const contestSchema = new mongoose.Schema({
    num: { type: Number, required: true, unique: ture }, // A.I
    kind: { type: String, required: true },
    id: { type: String, required: true },
    name: { type: String, required: true },
    topic: { type: String, required: true },
    part: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    want_num: { type: Number, required: true },
    apply_num: { type: Number, required: true },
    start_day: { type: Date, required: true, default: Date.now },
    end_day: { type: Date, required: true },
    hit: { type: Number, required: true, default: 0 },
    team_chk: { type: Number, required: true, default: 0 }
});

contestSchema.plugin(autoIncrement.plugin, {
    model: 'Contest', 
    field: 'num', 
    startAt: 1, 
    incrementBy: 1 
});

contestSchema.statics.saveContestItem = (req) => {
    
    return this.create({
        kind: req.body.kind,
        id: req.body.id,
        name: req.body.name,
        topic: req.body.topic,
        part: req.body.part,
        title: req.body.title,
        content: req.body.content,
        want_num: req.body.want_num,
        apply_num: req.body.apply_num,
        end_day: req.body.end_day
    })
};


contestSchema.statics.updateHit = (req) => {
    return this.update(
        { num: req.body.num }, 
        { $inc: { hit : 1 } }    
    );
}

// 신청 인원이 한 명 이상이라면 수정할 수 없다는 것 명시
contestSchema.statics.updateItemContest = (req) => {
    return update(
        { num: req.body.num }, 
        { $set: { 
            part: req.body.part,
            title: req.body.title,
            content: req.body.content,
            want_num: req.body.want_num,
            end_day: req.body.end_day
    } });
};

contestSchema.statics.deleteItemContest = (req) => {
    return remove({ num: req.body.num });
};


// List 시 검색
contestSchema.static.allItem = () => {
    return this.find()
}
contestSchema.static.listItem = (kind) => {
    return this.find({kind: kind})
}

// View 시 검색 
contestSchema.static.viewItem = (kind, num) => {
    return this.find({
        kind: kind,
        num : num
    })
}

// 검색
contestSchema.statics.findItem = (keyword) => {

    // keyword 하나 받아서 id, 이름, 주제, 파트, 제목, 내용 검색
    return this.find().or(
        [
            {id:{$regex:keyword}},
            {name:{$regex:keyword}},
            {topic:{$regex:keyword}},
            {part:{$regex:keyword}},
            {title:{$regex:keyword}},
            {content:{$regex:keyword}},
        ]
    );

};

// 정렬 (1, -1)
contestSchema.query.sortByNum = (order) => {
    return this.sort({num: order})
};
contestSchema.query.sortById = (order) => {
    return this.sort({id: order})
};
contestSchema.query.sortByAuthor = (order) => {
    return this.sort({name: order})
};
contestSchema.query.sortByTitle = (order) => {
    return this.sort({title: order})
};

module.exports = mongoose.model('Contest', contestSchema);
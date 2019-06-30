const mongoose = require('mongoose');

const studySchema = new mongoose.Schema({
    num: { type: Number, required: true, unique: ture }, // A.I
    kind: { type: String, required: true },
    id: { type: String, required: true },
    name: { type: String, required: true },
    topic: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    want_num: { type: Number, required: true },
    apply_num: { type: Number, required: true },
    start_day: { type: Date, required: true, default: Date.now },
    end_day: { type: Date, required: true },
    hit: { type: Number, required: true, default: 0 },
    team_chk: { type: Number, required: true, default: 0 }
});

studySchema.plugin(autoIncrement.plugin, {
    model: 'Study', 
    field: 'num', 
    startAt: 1, 
    incrementBy: 1 
});

studySchema.statics.saveStudyItem = (req) => {
    
    return this.create({
        kind: req.body.kind,
        id: req.body.id,
        name: req.body.name,
        topic: req.body.topic,
        title: req.body.title,
        content: req.body.content,
        want_num: req.body.want_num,
        apply_num: req.body.apply_num,
        end_day: req.body.end_day
    })
};


studySchema.statics.updateHit = (req) => {
    return this.update(
        { num: req.body.num }, 
        { $inc: { hit : 1 } }    
    );
}

// 신청 인원이 한 명 이상이라면 수정할 수 없다는 것 명시
studySchema.statics.updateItemStudy = (req) => {
    return update(
        { num: req.body.num }, 
        { $set: { 
            title: req.body.title,
            content: req.body.content,
            want_num: req.body.want_num,
            end_day: req.body.end_day
    } });
};

studySchema.statics.deleteItemStudy = (req) => {
    return remove({ num: req.body.num });
};


// List 시 검색
studySchema.statics.allItem = () => {
    return this.find()
}
studySchema.statics.listItem = (kind) => {
    return this.find({kind: kind})
}

// View 시 검색 
studySchema.statics.viewItem = (kind, num) => {
    return this.find({
        kind: kind,
        num : num
    })
}

// 검색
studySchema.statics.findItem = (keyword) => {

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
studySchema.query.sortByNum = (order) => {
    return this.sort({num: order})
};
studySchema.query.sortById = (order) => {
    return this.sort({id: order})
};
studySchema.query.sortByAuthor = (order) => {
    return this.sort({name: order})
};
studySchema.query.sortByTitle = (order) => {
    return this.sort({title: order})
};

module.exports = mongoose.model('Study', studySchema);
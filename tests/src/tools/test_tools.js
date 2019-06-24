import chai from "chai"
import chaiHttp from "chai-http"
import app from "../../../app"
import Tool from    "../../../src/tools/models"

chai.use(chaiHttp)
chai.should()

describe('GET /tools', () => {
    it('response should be an empty list', (done) => {
        chai.request(app)
            .get("/tools")
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a("array")
                chai.assert.isEmpty(res.body)
                done()
            })
    })

    it('response should has saved itens', (done) => {
        let data = {
            title: "test-title",
            link: "test-link",
            description: "test-description",
            tags: ["tag1", "tag2"]
        }
        let saved_tool = new Tool(data)
        saved_tool.save().then(() => {
            chai.request(app)
                .get("/tools")
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a("array")
                    chai.assert.isNotEmpty(res.body)

                    for (const prop of Object.keys(data)) {
                        chai.assert.deepEqual(saved_tool[prop], res.body[0][prop])
                    }
                        
                    done()
                })
        })
    })

    it('response should has tools with the test tag', (done) => {
        let tool1 = new Tool({
            title: "test-title",
            link: "test-link",
            description: "test-description",
            tags: ["tag1", "tag2"]
        })

        let tool2 = new Tool({
            title: "test-title2",
            link: "test-link2",
            description: "test-description2",
            tags: ["tag1", "test"]
        })

        Tool.collection.insertMany([tool1, tool2]).then(() => {
            chai.request(app)
                .get("/tools?tag=test")
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a("array")
                    chai.assert.equal(res.body.length, 1)
                    chai.assert.include(res.body[0].tags, "test")
                
                    chai.request(app)
                    .get("/tools")
                    .end((err, res) => {
                        chai.assert.equal(res.body.length, 2)
                        done()
                    })

                })
        })
    })

})

describe('POST /tools', () => {
    it('save valid tool', (done) => {
        let data_to_save = {
            title: "test-title",
            link: "test-link",
            description: "test-description",
            tags: ["tag1", "tag2"]
        }

        chai.request(app)
                .post("/tools")
                .type("application/json")
                .send(data_to_save)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a("object")
                    
                    for (const [prop, value] of Object.entries(data_to_save)) {
                        chai.assert.deepEqual(value, res.body[prop])
                    }

                    done()
                })
    })

    it('try save invalid tools', (done) => {
        let test_cases = [
            {  // No title
                link: "test-link",
                description: "test-description",
                tags: ["tag1", "tag2"],
            },
            {  // No link
                title: "test-title",
                description: "test-description",
                tags: ["tag1", "tag2"],
            }
        ]

        test_cases.forEach((item) => {
            chai.request(app)
                .post("/tools")
                .type("application/json")
                .send(item)
                .end((err, res) => {
                    res.should.have.status(404)
                })
        })
        done()
    })

})

describe('DELETE /tools/:id', () => {
    it('delete a tool', (done) => {
        let tool = new Tool({
            title: "test-title",
            link: "test-link",
            description: "test-description",
            tags: ["tag1", "tag2"]
        })
        tool.save((err, result) => {
            chai.request(app)
                .del(`/tools/${result.id}`)
                .end((err, res) => {
                    res.should.have.status(200)
                    Tool.collection.countDocuments().then((count) => {
                        chai.assert.equal(count, 0)
                    })
                    
                    done()
                })
        })
    })
    
})
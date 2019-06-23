import chai from "chai"
import chaiHttp from "chai-http"
import app from "../../../app"
import Tool from    "../../../src/tools/models"

chai.use(chaiHttp)
chai.should()

describe('GET /tools', () => {
    describe('empty', () => {
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
                describe: "test-description",
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
    })
})

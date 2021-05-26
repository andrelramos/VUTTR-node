const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../../app');
const Tool = require('../../../src/tools/models');

chai.use(chaiHttp);
chai.should();

describe('GET /tools', () => {
  it('response should be an empty list', (done) => {
    chai.request(app)
      .get('/tools')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        chai.assert.isEmpty(res.body);
        done();
      });
  });

  it('response should has saved itens', (done) => {
    const data = {
      title: 'test-title',
      link: 'test-link',
      description: 'test-description',
      tags: ['tag1', 'tag2'],
    };
    const savedTool = new Tool(data);
    savedTool.save().then(() => {
      chai.request(app)
        .get('/tools')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          chai.assert.isNotEmpty(res.body);

          Object.keys(data).forEach((prop) => {
            chai.assert.deepEqual(savedTool[`${prop}`], res.body[0][`${prop}`]);
          });

          done();
        });
    });
  });

  it('response should has tools with the test tag', (done) => {
    const tool1 = new Tool({
      title: 'test-title',
      link: 'test-link',
      description: 'test-description',
      tags: ['tag1', 'tag2'],
    });

    const tool2 = new Tool({
      title: 'test-title2',
      link: 'test-link2',
      description: 'test-description2',
      tags: ['tag1', 'test'],
    });

    Tool.collection.insertMany([tool1, tool2]).then(() => {
      chai.request(app)
        .get('/tools?tag=test')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          chai.assert.equal(res.body.length, 1);
          chai.assert.include(res.body[0].tags, 'test');

          chai.request(app)
            .get('/tools')
            .end((errAll, resAll) => {
              chai.assert.equal(resAll.body.length, 2);
              done();
            });
        });
    });
  });
});

describe('POST /tools', () => {
  it('save valid tool', (done) => {
    const dataToSave = {
      title: 'test-title',
      link: 'test-link',
      description: 'test-description',
      tags: ['tag1', 'tag2'],
    };

    chai.request(app)
      .post('/tools')
      .type('application/json')
      .send(dataToSave)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');

        Object.entries(dataToSave).forEach((prop) => {
          chai.assert.deepEqual(prop[1], res.body[`${prop[0]}`]);
        });

        done();
      });
  });

  it('try save invalid tools (no title)', (done) => {
    const item = { // No title
      link: 'test-link',
      description: 'test-description',
      tags: ['tag1', 'tag2'],
    };

    chai.request(app)
      .post('/tools')
      .type('application/json')
      .send(item)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('try save invalid tools (no link)', (done) => {
    const item = { // No title
      title: 'test-title',
      description: 'test-description',
      tags: ['tag1', 'tag2'],
    };

    chai.request(app)
      .post('/tools')
      .type('application/json')
      .send(item)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

describe('DELETE /tools/:id', () => {
  it('delete a tool', (done) => {
    const tool = new Tool({
      title: 'test-title',
      link: 'test-link',
      description: 'test-description',
      tags: ['tag1', 'tag2'],
    });
    tool.save((err, result) => {
      chai.request(app)
        .del(`/tools/${result.id}`)
        .end((errId, resId) => {
          resId.should.have.status(200);
          Tool.collection.countDocuments().then((count) => {
            chai.assert.equal(count, 0);
          });

          done();
        });
    });
  });
});

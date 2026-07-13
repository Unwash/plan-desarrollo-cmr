const { postEntries, getEnabledCategories, getEntry, updateEntry, deleteEntry } = require('../controllers/entry-controller');

jest.mock('../models/entry');
const Entry = require('../models/entry');

describe('Entry controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('postEntries - success', async () => {
    const req = { body: { description: 'test' } };
    const saveMock = jest.fn().mockResolvedValue(true);
    Entry.mockImplementation(function (data) { this.save = saveMock; Object.assign(this, data); });

    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await postEntries(req, res);

    expect(saveMock).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalled();
  });

  test('getEnabledCategories - returns entries', async () => {
    const entries = [{ description: 'a' }, { description: 'b' }];
    const sortMock = jest.fn().mockResolvedValue(entries);
    Entry.find.mockReturnValue({ sort: sortMock });

    const res = { json: jest.fn() };
    await getEnabledCategories({}, res);

    expect(Entry.find).toHaveBeenCalled();
    expect(sortMock).toHaveBeenCalledWith({ createdAt: 'ascending' });
    expect(res.json).toHaveBeenCalledWith(entries);
  });

  test('getEntry - not found', async () => {
    Entry.findById.mockResolvedValue(null);
    const req = { params: { id: '1' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await getEntry(req, res);

    expect(Entry.findById).toHaveBeenCalledWith('1');
    expect(res.status).toHaveBeenCalledWith(400);
  });

  test('updateEntry - entry not exists', async () => {
    Entry.findById.mockResolvedValue(null);
    const req = { params: { id: '1' }, body: {} };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await updateEntry(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  test('deleteEntry - success', async () => {
    const entry = { id: '1', description: 'x' };
    Entry.findByIdAndDelete.mockResolvedValue(entry);
    const req = { params: { id: '1' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await deleteEntry(req, res);

    expect(Entry.findByIdAndDelete).toHaveBeenCalledWith('1');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(entry);
  });
});

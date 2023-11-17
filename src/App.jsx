import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { toast } from 'react-toastify';
import vtexInput from 'vtex-input';
import axios from 'axios';
import './App.css';

function App() {
  const [input, inputChange, form, setInput] = vtexInput({
    name: '',
    email: '',
    password: '',
    role: '',
    permissions: [],
    gender: '',
    photo: null,
    gallery: null,
  });

  const handlePassword = () => {
    const password = Math.random().toString(36).slice(-8);

    // You can set custom input value like this
    setInput((prev) => ({ ...prev, password }));

    toast.success('Password generated successfully');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(input);
    // If you use any file input in your form, then you definitely use this (form.data())
    axios.post('/api/v1/user', form.data()).then((res) => {
      console.log(res);
      toast.success('User created successfully');
      form.reset();
    });

    // If you don't use any file input in your form, then you can use (input OR form.data()) as you wish
    axios.post('/api/v1/user', input).then((res) => {
      console.log(res);
      toast.success('User created successfully');
      form.reset();
    });
  };

  const handelReset = () => {
    form.reset();
  };

  return (
    <Card style={{ width: '28rem' }}>
      <Card.Header as='h4' className='text-center'>
        Add New User
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-3'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              name='name'
              value={input.name}
              onChange={inputChange}
              placeholder='Give your name'
            />
            <Form.Text className='text-muted'>
              we will never share your data with anyone else
            </Form.Text>
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              name='email'
              value={input.email}
              onChange={inputChange}
              placeholder='Give your email address'
            />
            <Form.Text className='text-muted'>
              we will never share your email with anyone else
            </Form.Text>
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Password</Form.Label>
            <br />
            <Button variant='secondary' size='sm' onClick={handlePassword}>
              Make random password
            </Button>
            <br />
            <Form.Text className='text-muted'>
              This password will be sent to the user email
            </Form.Text>
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Role</Form.Label>
            <Form.Select name='role' onChange={inputChange} value={input.role}>
              <option>Select user role</option>
              <option value='super-admin'>Super Admin</option>
              <option value='admin'>Admin</option>
              <option value='editor'>Editor</option>
              <option value='analyst'>Analyst</option>
              <option value='author'>Author</option>
            </Form.Select>
            <Form.Text className='text-muted'>
              This Role set your permissions
            </Form.Text>
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Permissions</Form.Label>
            {/* You can also use these checkboxes in the loop in the same way */}
            <Form.Check
              id='1'
              name='permissions'
              type='checkbox'
              checked={input.permissions?.includes('product')}
              onChange={inputChange}
              value='product'
              label='Product'
            />
            <Form.Check
              id='2'
              name='permissions'
              type='checkbox'
              checked={input.permissions?.includes('order')}
              onChange={inputChange}
              value='order'
              label='Order'
            />
            <Form.Check
              id='3'
              name='permissions'
              type='checkbox'
              checked={input.permissions?.includes('store')}
              onChange={inputChange}
              value='store'
              label='Store'
            />
            <Form.Check
              id='4'
              name='permissions'
              type='checkbox'
              checked={input.permissions?.includes('chart')}
              onChange={inputChange}
              value='chart'
              label='Chart'
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Gender</Form.Label>
            <Form.Check
              id='11'
              type='radio'
              name='gender'
              value='male'
              onChange={inputChange}
              label='Male'
            />
            <Form.Check
              id='22'
              type='radio'
              name='gender'
              value='female'
              onChange={inputChange}
              label='Female'
            />
            <Form.Check
              id='33'
              type='radio'
              name='gender'
              value='other'
              label='Other'
              onChange={inputChange}
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Profile Photo</Form.Label>
            <Form.Control name='photo' type='file' onChange={inputChange} />
          </Form.Group>
          {input.photo && (
            <div className='mb-3'>
              <img src={input.photo.url} alt='photo' width={200} />
              <button onClick={() => form.delFile('photo')}>Delete</button>
            </div>
          )}

          <Form.Group className='mb-3'>
            <Form.Label>Gallery Photos</Form.Label>
            <Form.Control
              name='gallery'
              type='file'
              onChange={inputChange}
              multiple
            />
          </Form.Group>
          {input.gallery &&
            input.gallery.urls.map((url, index) => (
              <div className='mb-3' key={index}>
                <img src={url} alt='gallery' width={200} />
                <button onClick={() => form.delFile('gallery', index)}>
                  Delete
                </button>
              </div>
            ))}

          <Form.Group className='d-flex gap-2'>
            <Button
              onClick={handelReset}
              className='w-100'
              variant='danger'
              type='reset'
            >
              Clear
            </Button>
            <Button className='w-100' variant='primary' type='submit'>
              Submit
            </Button>
          </Form.Group>
        </Form>
      </Card.Body>
      <Card.Footer className='text-center'>
        <Alert variant='success'>
          <h6 className='fs-5'>
            Source code ={' '}
            <b>
              <Alert.Link
                target='_blank'
                href='https://www.npmjs.com/package/vtex-input'
              >
                GitHub
              </Alert.Link>
            </b>
          </h6>
        </Alert>
      </Card.Footer>
    </Card>
  );
}

export default App;

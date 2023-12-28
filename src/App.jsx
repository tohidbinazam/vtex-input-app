import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { toast } from 'react-toastify';
import vtexInput from 'vtex-input';
import axios from 'axios';
import './App.css';

function App() {
  const [input, inputProps, form, setInput] = vtexInput({
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
    toast.success('Check console to see the data');

    // If you use any file input in your form, then you definitely use this form.data()
    axios.post('/api/v1/user', form.data()).then((res) => {
      console.log(res);
      toast.success('User created successfully');
      form.clear();
    });

    // If you don't use any file input in your form, then you can use [input OR form.data()] as you wish
    axios.post('/api/v1/user', input).then((res) => {
      console.log(res);
      toast.success('User created successfully');
      form.clear();
    });
  };

  const handelReset = () => {
    form.clear();
    toast.success('Form reset successfully');
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
              {...inputProps('name', 'text')}
              placeholder='Give your name'
            />
            <Form.Text className='text-muted'>
              we will never share your data with anyone else
            </Form.Text>
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              {...inputProps('email', 'email')}
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
            <Form.Select {...inputProps('role')}>
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
              id='Product'
              label='Product'
              value='product'
              {...inputProps('permissions', 'checkbox')}
              checked={input.permissions?.includes('product')}
            />
            <Form.Check
              id='Order'
              label='Order'
              value='order'
              {...inputProps('permissions', 'checkbox')}
              checked={input.permissions?.includes('order')}
            />
            <Form.Check
              id='Store'
              label='Store'
              value='store'
              {...inputProps('permissions', 'checkbox')}
              checked={input.permissions?.includes('store')}
            />
            <Form.Check
              id='Chart'
              label='Chart'
              value='chart'
              {...inputProps('permissions', 'checkbox')}
              checked={input.permissions?.includes('chart')}
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Gender</Form.Label>
            <Form.Check
              id='Male'
              label='Male'
              value='male'
              {...inputProps('gender', 'radio')}
              checked={input.gender?.includes('male')}
            />
            <Form.Check
              id='Female'
              label='Female'
              value='female'
              {...inputProps('gender', 'radio')}
              checked={input.gender?.includes('female')}
            />
            <Form.Check
              id='Other'
              label='Other'
              value='other'
              {...inputProps('gender', 'radio')}
              checked={input.gender?.includes('other')}
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Profile Photo</Form.Label>
            <Form.Control {...inputProps('photo', 'file')} />
          </Form.Group>
          {input.photo && (
            <div className='mb-3'>
              <img src={input.photo.url} alt='photo' width={200} />
              <button onClick={() => form.delFile('photo')}>Delete</button>
            </div>
          )}

          <Form.Group className='mb-3'>
            <Form.Label>Gallery Photos</Form.Label>
            <Form.Control {...inputProps('gallery', 'file')} multiple />
          </Form.Group>
          {input.gallery &&
            input.gallery.url.map((url, index) => (
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
                href='https://github.com/tohidbinazam/vtex-input-app'
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

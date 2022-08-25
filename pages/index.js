import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import ApiService from './api/Api.service.js';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

export default function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const testApi = async () => {
    // Test Get DATA
    try {
      setLoading(true);
      const usersData = await ApiService.httpGet('/users');
      setUsers(usersData);
      setLoading(false);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    testApi();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <Head>
        <title>Create Next App</title>
      </Head>
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/posts/new" component={PostNew} />
            <Route path="/posts/:id" component={PostsShow} />
            <Route path="/" component={PostIndex} />
          </Switch>
        </div>
      </BrowserRouter>

      <main>
        <h1>Hello World</h1>
        <p>ddfdds</p>

        <ul>
          {users.map((user) => {
            return <li key={user.id}>Name: {user.name}</li>;
          })}
        </ul>

        <ul>
          {users.map((user) => {
            return <li key={user.id}>Name: {user.name}</li>;
          })}
        </ul>
      </main>
    </div>
  );
}

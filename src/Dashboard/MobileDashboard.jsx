import React from 'react';
import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { FaBlog } from "react-icons/fa6";

const MobileDashboard = () => {
  return (
    <div className='px-4'>
      <Navbar fluid rounded>
        <Navbar.Brand href="/">
          <span className="self-center whitespace-nowrap text-3xl font-bold flex items-center gap-2">
            Astha Prokashon
          </span>
        </Navbar.Brand>
        <div className="flex gap-10">
          <Dropdown arrowIcon={false} inline >
            <Dropdown.Header>
              <span className="block text-sm">
                Bonnie Green
              </span>
              <span className="block truncate text-sm font-medium">
                name@flowbite.com
              </span>
            </Dropdown.Header>
            <Dropdown.Item>
              <Link to="/admin/dashboard">Dashboard</Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to="/settings">Settings</Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to="/earnings">Earnings</Link>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>
              <Link to="/logout">Sign out</Link>
            </Dropdown.Item>
          </Dropdown>
          <Navbar.Toggle />
        </div>

        <Navbar.Collapse>
          <Navbar.Link active href="/">
            Home
          </Navbar.Link>
          <Navbar.Link href="/admin/dashboard">
            Dashboard
          </Navbar.Link>
          <Navbar.Link href="/admin/dashboard/upload">
            Upload Book
          </Navbar.Link>
          <Navbar.Link href="/order-list">
            Your Pending ordered list
          </Navbar.Link>
          <Navbar.Link href="/logout">
            Signout
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default MobileDashboard;
